import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../shared/interfaces/order';
import { MaterialInstance } from '../../shared/interfaces/materialInstance';
import { MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() orders: Order[];
  @ViewChild('modal', null) modalRef: ElementRef;
  modal: MaterialInstance;
  selectedOrder: Order;

  constructor() {}

  ngOnInit() {}

  computedPrice(order: Order): number {
    return order.list.reduce((acc, item) => {
      acc += item.quantity * item.cost;
      return acc;
    }, 0);
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.modal.open();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  closeModal() {
    this.modal.close();
  }
}
