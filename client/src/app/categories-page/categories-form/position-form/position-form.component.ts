import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PositionsService } from '../../../shared/services/positions.service';
import { IPosition } from '../../../shared/interfaces/position';
import { MaterialService } from '../../../shared/services/material.service';
import { MaterialInstance } from '../../../shared/interfaces/materialInstance';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private route: ActivatedRoute, private positionsService: PositionsService) {}
  @Input('categoryId') categoryId: string;
  @ViewChild('modal', null) modalRef: ElementRef;
  public positions: IPosition[] = [];
  public isLoading: boolean = false;
  public modal: MaterialInstance;
  private positionId = null;
  private positionsSub$: Subscription;

  private form: FormGroup;

  ngOnInit(): void {
    this.positionsSub$ = this.positionsService.positionsList$.subscribe((positions: IPosition[]) => {
      this.positions = positions;
    });

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    });

    this.isLoading = true;

    // this.getAllPositions();
    if (this.categoryId) {
      this.positionsService.getPositionsByCategoryId(this.categoryId).subscribe(
        (positions: IPosition[]) => {
          this.positions = positions;
          this.isLoading = false;
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
        }
      );
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  onSelectPosition(position: IPosition) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    this.modal.open();
    MaterialService.updateInputs();
  }

  onAddPosition() {
    this.positionId = null;
    this.modal.open();
    MaterialService.updateInputs();
  }

  onCancel(event) {
    event.preventDefault();
    this.modal.close();
  }

  onSubmit() {
    this.isLoading = true;
    this.form.disable();

    if (!this.positionId) {
      const newPosition: IPosition = {
        name: this.form.value.name,
        cost: this.form.value.cost,
        category: this.categoryId
      };
      this.positionsService
        .addPosition(newPosition)
        .subscribe(
          (positions: IPosition[]) => {
            // console.log('Create positions => ', this.positions);
            this.positions = positions;
            // console.log('Create positions after => ', this.positions);
            MaterialService.toast('Success');
            this.modal.close();
            // // this.getAllPositions();
            this.form.enable();
            this.form.reset({ name: '', cost: 1 });
            this.isLoading = false;
          },
          (error) => {
            console.error(error);
            MaterialService.toast(error.error.message);
            this.modal.close();
            this.form.enable();
            this.form.reset({ name: '', cost: 1 });
            this.isLoading = false;
          },
          () => {
            this.modal.close();
            this.form.enable();
            this.form.reset({ name: '', cost: 1 });
            this.isLoading = false;
          }
        );
    } else {
      const newPosition: IPosition = {
        name: this.form.value.name,
        cost: this.form.value.cost,
        category: this.categoryId,
        _id: this.positionId
      };

      this.positionsService
        .updatePosition(newPosition)
        .pipe(take(1))
        .subscribe(
          (positions: IPosition[]) => {
            // this.getAllPositions();
            console.log('Update positions => ', this.positions);
            this.positions = positions;
            console.log('Update positions => ', this.positions);
            MaterialService.toast('Success');
            this.modal.close();
            this.form.enable();
            this.form.reset({ name: '', cost: 1 });
            this.isLoading = false;
          },
          (error) => {
            console.error(error);
            MaterialService.toast(error.error.message);
            this.modal.close();
            this.form.enable();
            this.form.reset({ name: '', cost: 1 });
            this.isLoading = false;
          },
          () => {
            this.modal.close();
            this.form.enable();
            this.form.reset({ name: '', cost: 1 });
            this.isLoading = false;

          }
        );
    }
  }

  onDeletePosition(position: IPosition) {}

  getAllPositions() {
    if (this.categoryId) {
      this.positionsService.getPositionsByCategoryId(this.categoryId).subscribe(
        (positions: IPosition[]) => {
          this.positions = positions;
          this.isLoading = false;

          console.log('Positions component state => ', this.positions);
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
        }
      );
    }
  }
}
