import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialInstance } from '../shared/interfaces/materialInstance';
import { MaterialService } from '../shared/services/material.service';
import { OrdersApiService } from '../shared/services/orders-api.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isFilterVisible = false;
  @ViewChild('tooltip', null) tooltipRef: ElementRef;
  tootip: MaterialInstance;

  constructor(private ordersApiService: OrdersApiService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.tootip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tootip.destroy();
  }
}
