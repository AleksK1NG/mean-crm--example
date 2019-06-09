import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from '../../shared/services/positions.service';
import { Observable } from 'rxjs';
import { IPosition } from '../../shared/interfaces/position';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from '../../shared/services/order.service';
import { MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {
  private positions$: Observable<IPosition[]>;

  constructor(private route: ActivatedRoute, private positionsService: PositionsService, private orderService: OrderService) {}

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.getPositionsByCategoryId(params['id']);
      }),
      map((positions: IPosition[]) => {
        return positions.map((pos: IPosition) => {
          pos.quantity = 1;
          return pos;
        });
      })
    );
  }

  addToORder(position: IPosition) {
    console.log('ADD Oerder Position -> ', position);
    MaterialService.toast(`Added x${position.quantity}`);
    this.orderService.createOrder(position);
  }
}
