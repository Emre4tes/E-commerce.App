import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Shipping } from 'src/app/model/order.model';
import { Subscription } from 'rxjs';
import { ShippingService } from 'src/app/services/shipping.service';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private _shipping: Shipping | undefined;
  isCollapsed = true;

  @Input()
  set shipping(value: Shipping | undefined) {
    this._shipping = value;
  }

  get shipping(): Shipping | undefined {
    return this._shipping;
  }

  constructor(private shippingService: ShippingService) {}

  ngOnInit(): void {
    this.shippingService.getShipping().subscribe({
      next: (shipping: Shipping) => {
        this.shipping = shipping;
      },

    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
