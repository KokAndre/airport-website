import { Injectable, EventEmitter } from '@angular/core';
import { ModalTypes } from 'src/app/enums/app.enums';
import { ModalDetails } from 'src/app/models/app-modal.model';


@Injectable({
  providedIn: 'root'
})
export class AppModalService {

  public onEmmitModal: EventEmitter<ModalDetails> = new EventEmitter<ModalDetails>();

  constructor() { }

  private emmitModal(type: ModalTypes, title: string, details: string, callbackFunction: (result) => void = (res) => { }, inputValues: any) {
    this.onEmmitModal.emit(new ModalDetails(type, title, details, callbackFunction, inputValues));
  }

  public ShowConfirmationModal(type: ModalTypes, title: string, details: any, inputValues: any, callbackFunction: (result) => void = (res) => { }): void {
    // Settime out helps control the closing and opening of a new modal immidiatly after one another.
    setTimeout(() => {
      this.emmitModal(type, title, details, callbackFunction, inputValues);
    }, 300);
  }

  public CloseModal() {
    this.onEmmitModal.emit(undefined);
  }
}
