import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Filter } from '../../shared/interfaces/filter';
import { MaterialService } from '../../shared/services/material.service';
import { MaterialDatepicker } from '../../shared/interfaces/materialInstance';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('start', null) startRef: ElementRef;
  @ViewChild('end', null) endRef: ElementRef;
  @Output() onFilter = new EventEmitter<Filter>();
  order: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;
  isValid = true;

  constructor() {}

  ngOnInit() {}

  submitFilter() {
    const filter: Filter = {};
    if (this.order) {
      filter.order = this.order;
    }

    if (this.start.date) {
      filter.start = this.start.date;
    }

    if (this.end.date) {
      filter.end = this.end.date;
    }
    this.onFilter.emit(filter);
  }

  ngAfterViewInit() {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this));
  }

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }
    this.isValid = this.start.date < this.end.date;
  }
}
