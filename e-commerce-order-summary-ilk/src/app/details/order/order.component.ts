import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private _orderItems: Order[] = [];
  orderDetails: any;
  orderDetailsTotalAmount!: string | number;
  isCollapsed = true;

  @Input()
  set orderItems(value: Order[] | undefined) {
    this._orderItems = value || [];
  }

  get orderItems(): Order[] {
    return this._orderItems;
  }

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

    this.orderService.getOrderItems().subscribe({
      next: (orders: Order[]) => {
        this.orderItems = orders;

        this.calculateOrderDetails();
      },
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calculateOrderDetails(): void {

    this.orderDetailsTotalAmount = this.orderItems.reduce((total, order) => total + order.amount, 0);
  }
}
