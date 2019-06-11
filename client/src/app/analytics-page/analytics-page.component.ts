import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces/analyticsPage';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit {
  @ViewChild('gain', null) gainRef: ElementRef;
  @ViewChild('order', null) orderRef: ElementRef;

  average: number
  loading: true
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
      console.log(data);
    })
  }
}
