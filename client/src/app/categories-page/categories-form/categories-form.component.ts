import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  private id: string;
  private isNew = true;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.isNew = false;
      }
    });
    console.log(this.id);
  }
}
