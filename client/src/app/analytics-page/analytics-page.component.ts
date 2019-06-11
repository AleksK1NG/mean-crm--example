import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces/analyticsPage';
import { Subscription } from 'rxjs';

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
    this.averageSub$ = this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;
      console.log(data);
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.averageSub$) {
      this.averageSub$.unsubscribe();
    }
  }
}
