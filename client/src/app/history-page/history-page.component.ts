import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialInstance } from '../shared/interfaces/materialInstance';
import { MaterialService } from '../shared/services/material.service';
import { OrdersApiService } from '../shared/services/orders-api.service';
import { Order } from '../shared/interfaces/order';
import { Filter } from '../shared/interfaces/filter';

const STEP = 2;
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
  limit = STEP;
  ordersSub$;
  orders: Order[] = [];
  loading = false;
  reloading = false;
  isAllLoaded = false;
  filter: Filter = {};

  constructor(private ordersApiService: OrdersApiService) {}

  ngOnInit() {
    this.reloading = true;
    this.fetchOrders();
  }

  private fetchOrders() {
    // const params = {
    //   offset: this.offset,
    //   limit: this.limit
    // };
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    this.ordersSub$ = this.ordersApiService.getAllOrders(params).subscribe((orders: Order[]) => {
      this.orders = this.orders.concat(orders);
      this.isAllLoaded = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });
  }

  ngAfterViewInit() {
    this.tootip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tootip.destroy();
    this.ordersSub$.unsubscribe();
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetchOrders();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetchOrders();
  }
}
