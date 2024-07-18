// order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient) {}

  getOrderItems(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
