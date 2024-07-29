import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, delay, mergeMap, retry } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order/order.service';
import { ShippingService } from 'src/app/services/shipping/shipping.service';
import { TaxService } from 'src/app/services/tax/tax.service';
import { IOrderSummary } from 'src/app/model/order-summary.model';

@Injectable({
  providedIn: 'root',
})
export class OrderSummaryService {
  private readonly RETRY_COUNT = 5;
  private readonly DELAY_MS = 1000;

  constructor(
    private orderService: OrderService,
    private shippingService: ShippingService,
    private taxService: TaxService
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      alert(`Error occurred while fetching ${operation}`);
      return of(result as T);
    };
  }

  private applyRetryAndDelay<T>(
    observable: Observable<T>,
    operation: string,
    result: T
  ): Observable<T> {
    return observable.pipe(
      retry(this.RETRY_COUNT),
      delay(this.DELAY_MS),
      catchError(this.handleError(operation, result))
    );
  }

  getSummary(): Observable<IOrderSummary> {
    return forkJoin({
      order: this.applyRetryAndDelay(
        this.orderService.getOrderItems(),
        'order items',
        []
      ),
      tax: this.applyRetryAndDelay(this.taxService.getTaxData(), 'tax', {
        amount: 0,
        description: 'No tax available',
      }),
    }).pipe(
      mergeMap(({ order, tax }) => {
        const totalWeight = order.reduce(
          (acc, item) => acc + item.weight * item.qty,
          0
        );

        return this.applyRetryAndDelay(
          this.shippingService.getShippingData(totalWeight),
          'shipping cost',
          {
            cost: 0,
            description: 'No shipping cost available',
            carrier: '',
            address: '',
          }
        ).pipe(
          mergeMap((shipping) => of({ order, shipping, tax } as IOrderSummary))
        );
      })
    );
  }
}
