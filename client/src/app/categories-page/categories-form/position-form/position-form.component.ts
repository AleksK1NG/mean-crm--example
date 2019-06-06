import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  }


}
