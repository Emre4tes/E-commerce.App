import { TaxService } from './../../services/tax.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Tax } from 'src/app/model/order.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tax-details',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private _tax: Tax | undefined;
  isCollapsed = true;

  @Input()
  set tax(value: Tax | undefined) {
    this._tax = value;
  }

  get tax(): Tax | undefined {
    return this._tax;
  }

  constructor(private taxService: TaxService) {}

  ngOnInit(): void {

    this.taxService.getTax().subscribe({
      next: (tax: Tax) => {
        this.tax = tax;
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
