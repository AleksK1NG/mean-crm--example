import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/interfaces/category';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) {}
  private id: string;
  private isNew = true;

  private form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.isNew = false;
        this.id = params['id'];
        console.log(params.id);
        console.log('id => ', this.id);
      }
    });
  }

  onSubmit() {
    console.log('Add Category => ', this.form.value);

    this.categoriesService.addCategory(this.form.value).subscribe(
      (categories: Category[]) => {
        console.log('Categories after Add Category call => ', categories);
      },
      (error) => {
        console.error('Categories ERROR after Add Category call => ', error);
      }
    );
  }

  deleteCategory() {
    console.log('Delete Category ID from state => ', this.id);
    if (this.id) {
      this.categoriesService.deleteCategory(this.id).subscribe(
        (categories: Category[]) => {
          console.log('Categories after Add Category call => ', categories);
        },
        (error) => {
          console.error('Categories ERROR after Add Category call => ', error);
        }
      );
    }
  }
}

