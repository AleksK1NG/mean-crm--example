import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces/analyticsPage';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { createChartConfig } from '../utils/chartjs';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('gain', null) gainRef: ElementRef;
  @ViewChild('order', null) orderRef: ElementRef;

  average: number;
  averageSub$: Subscription;
  loading = true;
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)'
    };

    const orderConfig: any = {
      label: 'orders',
      color: 'rgb(54, 162, 235)'
    };

    this.averageSub$ = this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;
      console.log(data);
      gainConfig.labels = data.chart.map((item) => item.label);
      gainConfig.data = data.chart.map((item) => item.gain);

      orderConfig.labels = data.chart.map((item) => item.label);
      orderConfig.data = data.chart.map((item) => item.order);

      // temp mock Gain Data
      // gainConfig.labels.push('10.05.2019');
      // gainConfig.labels.push('12.05.2019');
      // gainConfig.data.push(1500);
      // gainConfig.data.push(25700);
      // temp mock Gain Data

      // temp mock Orders Data
      // orderConfig.labels.push('10.05.2019');
      // orderConfig.labels.push('12.05.2019');
      // orderConfig.data.push(1500);
      // orderConfig.data.push(25700);
      // temp mock Orders Data

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';

      new Chart(gainCtx, createChartConfig(gainConfig));
      new Chart(orderCtx, createChartConfig(orderConfig));

      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.averageSub$) {
      this.averageSub$.unsubscribe();
    }
  }
}
