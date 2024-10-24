import { Component, OnInit } from '@angular/core';
import { ModalTypes } from 'src/app/enums/app.enums';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
 
  constructor(public appModalService: AppModalService) { }

  ngOnInit() {
  }

  public displayRunwayInfoDocument() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Runway Info', 'assets/documents/FATA-Runway-Information-FATA.pdf', null)
  }

}
