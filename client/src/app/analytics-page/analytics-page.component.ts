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

    this.averageSub$ = this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;
      console.log(data);
      gainConfig.labels = data.chart.map((item) => item.label);
      gainConfig.data = data.chart.map((item) => item.gain);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';

      new Chart(gainCtx, createChartConfig(gainConfig));

      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.averageSub$) {
      this.averageSub$.unsubscribe();
    }
  }
}
