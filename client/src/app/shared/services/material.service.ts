import { ElementRef, Injectable } from '@angular/core';

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
}
