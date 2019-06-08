import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialService } from '../shared/services/material.service';
import { MaterialInstance } from '../shared/interfaces/materialInstance';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private isRoot: boolean;
  @ViewChild('modal', null) modalRef: ElementRef;
  public modal: MaterialInstance;

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.modal.close();
  }
}
