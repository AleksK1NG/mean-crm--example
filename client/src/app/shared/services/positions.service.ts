import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private errorSub$ = new BehaviorSubject<any>(null);
  private positions: Position[] = [];
  private positionsList$ = new BehaviorSubject<Position[]>(this.positions);
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getPositionsByCategoryId(categoryId: string): BehaviorSubject<Position[]> {
    this.isLoading$.next(true);
    this.httpClient.get<Position[]>(`/api/v1/position/${categoryId}`).subscribe(
      (positions: Position[]) => {
        this.positionsList$.next(positions);
        console.log('GET Positions service => ', positions);
        this.isLoading$.next(false);
        this.errorSub$.next(null);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    return this.positionsList$;
  }
}
