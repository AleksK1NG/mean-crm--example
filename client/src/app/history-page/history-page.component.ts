import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialInstance } from '../shared/interfaces/materialInstance';
import { MaterialService } from '../shared/services/material.service';
import { OrdersApiService } from '../shared/services/orders-api.service';
import { Order } from '../shared/interfaces/order';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isFilterVisible = false;
  @ViewChild('tooltip', null) tooltipRef: ElementRef;
  tootip: MaterialInstance;
  offset = 0;
  limit = 5;
  ordersSub$;
  orders: Order[] = [];

  constructor(private ordersApiService: OrdersApiService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  private fetchOrders() {
    const params = {
      offset: this.offset,
      limit: this.limit
    };
    this.ordersSub$ = this.ordersApiService.getAllOrders(params).subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  ngAfterViewInit() {
    this.tootip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tootip.destroy();
    this.ordersSub$.unsubscribe();
  }
}
