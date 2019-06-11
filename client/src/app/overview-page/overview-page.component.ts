import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverviewPage } from '../shared/interfaces/overviewPage';
import { MaterialInstance } from '../shared/interfaces/materialInstance';
import { MaterialService } from '../shared/services/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget', null) tapTargetRef: ElementRef;
  data$: Observable<OverviewPage>;
  tapTarget: MaterialInstance;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.data$ = this.analyticsService.getOverview();
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  ngOnDestroy() {
    this.tapTarget.destroy();
  }

  openInfo() {
    this.tapTarget.open();
  }
}
