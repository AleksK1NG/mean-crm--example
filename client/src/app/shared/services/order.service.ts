import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPosition } from '../interfaces/position';
import { Order, OrderPosition } from '../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orderList: OrderPosition[] = [];
  public price = 0;

  constructor(private httpClient: HttpClient) {}



  createOrder(position: IPosition) {
    const orderPosition: OrderPosition = Object.assign(
      {},
      { name: position.name, cost: position.cost, quantity: position.quantity, _id: position._id }
    );

    const candidate = this.orderList.find((p) => p._id === position._id);
    if (candidate) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.orderList.push(orderPosition);
    }

    this.computePrice();
  }

  deleteOrder(orderPosition: OrderPosition) {
    this.orderList = this.orderList.filter((p) => p._id !== orderPosition._id);

    this.computePrice();
  }

  clearOrder() {
    this.orderList = [];
    this.price = 0;
  }

  private computePrice() {
    this.price = this.orderList.reduce((acc, item) => {
      acc += item.quantity * item.cost;

      return acc;
    }, 0);
  }
}
