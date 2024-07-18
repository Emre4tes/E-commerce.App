import { OrderSummary } from '../model/order.model';
import { OrderSummaryService } from '../services/order-summary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  orderSummary!: OrderSummary;
  orderTotal!: number;
  orderDetailsTotalAmount!: number;
  destroy$: Subject<void> = new Subject<void>();
  orderTotalAmount: string | number | undefined;

  constructor(private orderSummaryService: OrderSummaryService) {}

  ngOnInit(): void {
    this.orderSummaryService.getSummary()
      .pipe(takeUntil(this.destroy$))
      .subscribe((summary: OrderSummary) => {
        this.orderSummary = summary;
        this.calculateOrderTotal();
        this.calculateOrderDetailsTotalAmount();
      });
  }

  private calculateOrderTotal(): void {
    if (this.orderSummary) {
      const orderTotal = this.orderSummary.order.reduce(
        (total: number, item: { price: number; qty: number }) =>
          total + item.price * item.qty,
        0
      );
      const shippingCost = this.orderSummary.shipping.cost;
      const taxAmount =
        orderTotal * this.orderSummary.tax.amount;
      this.orderTotal = orderTotal + shippingCost + taxAmount;
    }
  }

  private calculateOrderDetailsTotalAmount(): void {
    if (this.orderSummary) {
      this.orderDetailsTotalAmount = this.orderSummary.order.reduce(
        (total: number, item: { price: number; qty: number }) =>
          total + item.price * item.qty,
        0
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
