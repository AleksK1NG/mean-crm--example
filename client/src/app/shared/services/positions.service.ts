import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPosition } from '../interfaces/position';
import { Category } from '../interfaces/category';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private errorSub$ = new BehaviorSubject<any>(null);
  private positions: IPosition[] = [];
  public positionsList$ = new BehaviorSubject<IPosition[]>(this.positions);
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPositionsByCategoryId(categoryId: string): BehaviorSubject<IPosition[]> {
    this.isLoading$.next(true);
    this.httpClient.get<IPosition[]>(`/api/v1/position/${categoryId}`).subscribe(
      (positions: IPosition[]) => {
        this.positions = positions;
        this.positionsList$.next(this.positions);
        console.log('GET Positions service => ', positions);
        console.log('GET Positions service => ', this.positions);
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

  addPosition(position: IPosition): BehaviorSubject<IPosition[]> {
    this.isLoading$.next(true);
    // this.getPositionsByCategoryId(position.category).pipe(take(1)).subscribe((positions: IPosition[]) => {
    //   this.positions = positions;
    //   this.httpClient.post<IPosition>('/api/v1/position', position).subscribe(
    //     (position: IPosition) => {
    //       this.positions.push(position);
    //       this.positionsList$.next(this.positions);
    //       this.errorSub$.next(null);
    //       this.isLoading$.next(false);
    //       this.router.navigate([`/categories/${position.category}`]);
    //     },
    //     (error) => {
    //       this.errorSub$.next(error);
    //       this.isLoading$.next(false);
    //     }
    //   );
    //
    //
    //
    // });
    this.httpClient.post<IPosition>('/api/v1/position', position).subscribe(
      (position: IPosition) => {
        console.log('service positions -> ', this.positions);
        this.positions.push(position);
        console.log('service positions -> ', this.positions);
        this.positionsList$.next(this.positions);
        this.errorSub$.next(null);
        this.isLoading$.next(false);
        // this.router.navigate([`/categories/${position.category}`]);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    return this.positionsList$;
  }

  updatePosition(position: IPosition): BehaviorSubject<IPosition[]> {
    this.isLoading$.next(true);
    this.httpClient.patch<IPosition>(`/api/v1/position/${position._id}`, position).subscribe(
      (updatedPosition: IPosition) => {
        this.positions = this.positions.map((pos: IPosition) =>
          pos._id === updatedPosition._id ? updatedPosition : pos
        );

        this.positionsList$.next(this.positions);
        this.errorSub$.next(null);
        this.isLoading$.next(false);
        this.router.navigate([`/categories/${position.category}`]);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    // return this.categoriesSub$;
    return this.positionsList$;
  }

  deletePosition(position: IPosition): BehaviorSubject<IPosition[]> {
    this.isLoading$.next(true);

    this.httpClient.delete<IPosition>(`/api/v1/position/${position._id}`).subscribe(
      (deletedPosition: IPosition) => {
        this.positions = this.positions.filter((pos) => pos._id !== position._id);

        this.positionsList$.next(this.positions);

        this.errorSub$.next(null);
        this.isLoading$.next(false);
        this.router.navigate([`/categories/${position.category}`]);
      },
      (error) => {
        this.errorSub$.next(error);
        this.isLoading$.next(false);
      }
    );

    // return this.categoriesSub$;
    return this.positionsList$;
  }
}
