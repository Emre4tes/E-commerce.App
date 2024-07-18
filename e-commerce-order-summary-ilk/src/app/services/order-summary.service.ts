import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Tax, Shipping, Order, OrderSummary } from './../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {
  private orderUrl = 'http://localhost:3000/order';
  private shippingUrl = 'http://localhost:3000/shipping';
  private taxUrl = 'http://localhost:3000/tax';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<OrderSummary> {
    return this.http.get<Order>(this.orderUrl).pipe(
      mergeMap(order => {
        const totalWeight = order.order.reduce((acc: number, item: { weight: number; qty: number; }) => acc + (item.weight * item.qty), 0);
        const shipping$ = this.http.get<Shipping>(`${this.shippingUrl}?weight=${totalWeight}`);
        const tax$ = this.http.get<Tax>(this.taxUrl);

        return forkJoin({
          order: of(order.order),
          shipping: shipping$,
          tax: tax$
        }).pipe(
          map(response => ({
            order: response.order,
            shipping: response.shipping,
            tax: response.tax
          } as OrderSummary))
        );
      })
    );
  }
}
