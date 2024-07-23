import { Tax } from './../model/order.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  getTaxDetails() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/tax';

  constructor(private http: HttpClient) {}

  getTax(): Observable<Tax> {
    return this.http.get<Tax>(this.apiUrl);
  }
}
