import { Component } from '@angular/core';
import { OrderSummaryService } from './services/order-summary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-commerce-order-summary';
  posts: any;

  constructor(private service:OrderSummaryService){}

    ngOnInit() {

      this.service.getSummary()
      .subscribe(response=>{
        this.posts=response;
      })
    }
}
