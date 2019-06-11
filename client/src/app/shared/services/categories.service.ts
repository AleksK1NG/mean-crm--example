import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  errorSub$ = new BehaviorSubject<any>(null);
  categories: Category[] = [];
  currentCategory: Category = null;

  isLoading$ = new BehaviorSubject<boolean>(false);
  categoriesSub$ = new Subject<Category[]>();
  categoriesList$ = new BehaviorSubject<Category[]>(this.categories);
  currentCategorySub$ = new BehaviorSubject<Category>(this.currentCategory);

  getAllCategories(): Subject<Category[]> {
    // const categoriesSub$ = new Subject<Category[]>();
    this.isLoading$.next(true);

    this.httpClient.get<Category[]>('/api/v1/category').subscribe(
      (categories: Category[]) => {
        this.categoriesList$.next(categories);
        this.categoriesSub$.next(categories);
        this.errorSub$.next(null);
        this.isLoading$.next(false);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    return this.categoriesList$;
  }

  getCategory(categoryId: string): BehaviorSubject<Category> {
    this.isLoading$.next(true);

    this.httpClient.get<Category>(`/api/v1/category/${categoryId}`).subscribe(
      (category: Category) => {
        this.currentCategorySub$.next(category);
        this.errorSub$.next(null);
        this.isLoading$.next(false);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    return this.currentCategorySub$;
  }

  addCategory(newCategory: Category): BehaviorSubject<Category[]> {
    this.isLoading$.next(true);
    this.httpClient.post<Category>('/api/v1/category', newCategory).subscribe(
      (category: Category) => {
        this.categories.push(category);
        this.categoriesList$.next(this.categories);
        this.errorSub$.next(null);
        this.isLoading$.next(false);
        this.router.navigate(['/categories']);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    return this.categoriesList$;
  }

  updateCategory(newCategory: Category): BehaviorSubject<Category[]> {
    this.isLoading$.next(true);
    this.httpClient.patch<Category>(`/api/v1/category/${newCategory._id}`, newCategory).subscribe(
      (updatedCategory: Category) => {
        this.categories = this.categories.map((cat: Category) => (cat._id === updatedCategory._id ? updatedCategory : cat));

        this.categoriesList$.next(this.categories);
        this.errorSub$.next(null);
        this.isLoading$.next(false);
        this.router.navigate(['/categories']);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    return this.categoriesList$;
  }

  deleteCategory(categoryId: string): BehaviorSubject<Category[]> {
    this.isLoading$.next(true);
    this.httpClient.delete<Category>(`/api/v1/category/${categoryId}`).subscribe(
      (deletedCategory: Category) => {
        this.categories = this.categories.filter((cat: Category) => cat._id !== categoryId);

        this.categoriesList$.next(this.categories);
        this.errorSub$.next(null);
        this.isLoading$.next(false);
        this.router.navigate(['/categories']);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    return this.categoriesList$;
  }
}
