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

  private categories: Category[] = this.categoriesService.getCategories();
  private isLoadingSub: Subscription;
  private isLoading = true;

  ngOnInit() {
    this.isLoadingSub = this.categoriesService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.categoriesService.fetchAllCategories().subscribe(
      (categories: Category[]) => {
        this.categoriesService.setCategories(categories);
        console.log('GET categories => ', categories);
      },
      (error) => {
        this.categoriesService.setError(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
  }
}
