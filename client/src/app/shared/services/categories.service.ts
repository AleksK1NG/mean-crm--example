import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  // private error = null;
  private errorSub$ = new BehaviorSubject<any>(null);
  private categories: Category[] = [];
  public isLoading$ = new BehaviorSubject<boolean>(false);

  private categoriesSub$ = new Subject<Category[]>();

  // fetchAllCategories(): Observable<Category[]> {
  //   console.log('fetch all categories');
  //   this.isLoading$.next(true);
  //   return this.httpClient.get<Category[]>('/api/v1/category');
  // }

  getAllCategories(): Subject<Category[]> {
    // const categoriesSub$ = new Subject<Category[]>();
    this.isLoading$.next(true);
    this.httpClient.get<Category[]>('/api/v1/category').subscribe(
      (categories: Category[]) => {
        this.categoriesSub$.next(categories);
        this.errorSub$.next(null);
        this.isLoading$.next(false);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    return this.categoriesSub$;
  }

  // setError(error) {
  //   console.error(error);
  //   this.error = error;
  //   this.isLoading$.next(false);
  // }
  //
  // setCategories(categories: Category[]) {
  //   this.categories = categories;
  //   this.isLoading$.next(false);
  // }

  // getCategories(): Category[] {
  //   return this.categories;
  // }
}

