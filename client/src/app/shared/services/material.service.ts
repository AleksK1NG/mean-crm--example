import { ElementRef, Injectable } from '@angular/core';
import { MaterialDatepicker, MaterialInstance } from '../interfaces/materialInstance';

declare var M;

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor() {}

  static toast(message: string) {
    M.toast({ html: message, classes: 'rounded' });
  }

  static initFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateInputs() {
    M.updateTextFields();
  }

  static initModal(modalRef: ElementRef): MaterialInstance {
    return M.Modal.init(modalRef.nativeElement);
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement);
  }

  static initDatePicker(ref: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    });
  }
}
