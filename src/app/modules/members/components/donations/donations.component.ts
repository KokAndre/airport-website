import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  public isNameInLightsExpanded = true;
  public isWhyShouldYouContributeExpanded = true;
  public isWhatCanYouDonateExpanded = true;
  public isHowDoYouJoinTheRanksExpanded = true;
  public isWhatsThePlanExpanded = true;
  public isHowDoYouJoinExpanded = true;
  public isRememberExpanded = true;


  constructor(public router: Router, public appModalService: AppModalService) { }

  ngOnInit() {
    this.displayMemberDonatoinsDocument()
  }

  public displayMemberDonatoinsDocument() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Donations Board', '../../../../../assets/documents/20250121 - Owners Contributions.pdf', null);
  }

  public navigateToGreeningTedderfield() {
    this.router.navigateByUrl(AppRoutes.GreeningTedderfield);
  }

}
