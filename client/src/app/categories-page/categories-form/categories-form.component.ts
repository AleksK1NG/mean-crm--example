import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/interfaces/category';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('input', null) uploadInputRef: ElementRef;
  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) {}
  private id: string;
  private isNew = true;

  private form: FormGroup;
  private category: Category = null;
  private image: File;
  private imagePreview = null;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.form.disable();
          if (params['id']) {
            this.isNew = false;
            this.id = params['id'];
            return this.categoriesService.getCategory(params['id']);
          }
          return of(null);
        })
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.form.patchValue({
              name: category.name
            });
            this.imagePreview = category.imageUrl;
            MaterialService.updateInputs();
          }
          this.category = category;
          this.form.enable();
        },
        (error) => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        }
      );
  }

  onSubmit() {
    if (this.isNew) {
      this.categoriesService
        .addCategory(this.form.value)
        .pipe(take(1))
        .subscribe(
          (categories: Category[]) => {
            MaterialService.toast('Success');
          },
          (error) => {
            MaterialService.toast(error.error.message);
          }
        );
    }

    if (!this.isNew && this.id) {
      const newCategory: Category = {
        name: this.form.value.name,
        _id: this.id,
        imageUrl: this.imagePreview
      };
      this.categoriesService
        .updateCategory(newCategory)
        .pipe(take(1))
        .subscribe(
          (res) => {
            MaterialService.toast('Success');
          },
          (error) => {
            console.error(error);
            MaterialService.toast(error.error.message);
          }
        );
    }
  }

  deleteCategory() {
    if (this.id) {
      this.categoriesService
        .deleteCategory(this.id)
        .pipe(take(1))
        .subscribe(
          (categories: Category[]) => {
            MaterialService.toast('Success');
          },
          (error) => {
            console.error(error);
            MaterialService.toast(error.error.message);
          }
        );
    }
  }

  triggerClick() {
    this.uploadInputRef.nativeElement.click();
  }

  onFileUpload(event) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      console.log(typeof reader.result);
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
}
