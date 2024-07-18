import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaxComponent } from './details/tax/tax.component';
import { ShippingComponent } from './details/shipping/shipping.component';
import { OrderComponent } from './details/order/order.component';
import { OrderService } from './services/order.service';
import { ShippingService } from './services/shipping.service';
import { TaxService } from './services/tax.service';

@NgModule({
  declarations: [
    AppComponent,
    OrderSummaryComponent,
    TaxComponent,
    ShippingComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [OrderService, ShippingService, TaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
