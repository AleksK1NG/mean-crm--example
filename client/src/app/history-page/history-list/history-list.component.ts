import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../shared/interfaces/order';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {
  @Input() orders: Order[];

  constructor() {}

  ngOnInit() {}

  computedPrice(order: Order): number {
    return order.list.reduce((acc, item) => {
      acc += item.quantity * item.cost;
      return acc;
    }, 0);
  }
}
