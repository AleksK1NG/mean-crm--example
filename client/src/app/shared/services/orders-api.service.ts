import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order } from '../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {
  constructor(private httpClient: HttpClient) {}

  getAllOrders(params: any = {}): Observable<Order[]> {
    return this.httpClient.get<Order[]>('/api/v1/order', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>('/api/v1/order', order);
  }
}
