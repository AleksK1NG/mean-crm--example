import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPosition } from '../interfaces/position';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private errorSub$ = new BehaviorSubject<any>(null);
  private positions: IPosition[] = [];
  private positionsList$ = new BehaviorSubject<IPosition[]>(this.positions);
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getPositionsByCategoryId(categoryId: string): BehaviorSubject<IPosition[]> {
    this.isLoading$.next(true);
    this.httpClient.get<IPosition[]>(`/api/v1/position/${categoryId}`).subscribe(
      (positions: IPosition[]) => {
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

