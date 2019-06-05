import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  private error = null;
  private categories: Category[] = [];
  public isLoading$ = new BehaviorSubject<boolean>(false);

  fetchAllCategories(): Observable<Category[]> {
    console.log('fetch all categories');
    this.isLoading$.next(true);
    return this.httpClient.get<Category[]>('/api/v1/category');
  }

  setError(error) {
    console.error(error);
    this.error = error;
    this.isLoading$.next(false);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
    this.isLoading$.next(false);
  }

  getCategories(): Category[] {
    return this.categories;
  }
}
