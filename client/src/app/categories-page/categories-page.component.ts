import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/interfaces/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  constructor(private categoriesService: CategoriesService) {}

  // private categories: Category[] = this.categoriesService.getCategories();
  private isLoadingSub: Subscription;
  private isLoading = true;
  private categoriesSub: Category[];

  ngOnInit() {
    this.isLoadingSub = this.categoriesService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.categoriesService.getAllCategories().subscribe((categories: Category[]) => {
      this.categoriesSub = categories;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
  }
}
