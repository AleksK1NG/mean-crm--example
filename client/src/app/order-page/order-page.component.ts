import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialService } from '../shared/services/material.service';
import { MaterialInstance } from '../shared/interfaces/materialInstance';
import { OrderService } from '../shared/services/order.service';
import { Order, OrderPosition } from '../shared/interfaces/order';
import { OrdersApiService } from '../shared/services/orders-api.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private isRoot: boolean;
  @ViewChild('modal', null) modalRef: ElementRef;
  public modal: MaterialInstance;
  public loading = false;
  private orderSub$;

  constructor(private router: Router, private orderService: OrderService, private ordersapiService: OrdersApiService) {}

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
    if (this.orderSub$) {
      this.orderSub$.unsubscribe();
    }
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.loading = true;
    this.modal.close();

    const order: Order = {
      list: this.orderService.orderList.map((item) => {
        delete item._id;
        return item;
      })
    };
    this.orderSub$ = this.ordersapiService.createOrder(order).subscribe(
      (newOrder) => {
        MaterialService.toast(`Order # ${newOrder.order} created `);
        this.orderService.clearOrder();
      },
      (error) => {
        console.error(error);
        MaterialService.toast(error.error.message);
      },
      () => {
        this.modal.close();
        this.loading = false;
      }
    );
  }

  deletePosition(orderPosition: OrderPosition) {
    this.orderService.deleteOrder(orderPosition);
  }
}
