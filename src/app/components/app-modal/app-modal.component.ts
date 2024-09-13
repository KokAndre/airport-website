import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalTypes } from 'src/app/enums/app.enums';
import { ModalDetails } from 'src/app/models/app-modal.model';

@Component({
  selector: 'app-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements OnInit {
  public modalTypesEnum = ModalTypes;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalDetails,) { }

  ngOnInit() {
  }

}
