import { Component, OnInit } from '@angular/core';
import { GetInterestedInHangerDataResponse } from 'src/app/models/get-interested-in-hanger-data-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-manage-hangers-for-sale-interest',
  templateUrl: './manage-hangers-for-sale-interest.component.html',
  styleUrls: ['./manage-hangers-for-sale-interest.component.scss']
})
export class ManageHangersForSaleInterestComponent implements OnInit {
  public interestedInHangerForSaleData = new Array<GetInterestedInHangerDataResponse.HangerInterests>();

  constructor(public adminService: AdminService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getInterestedInHangerData();
  }

  public getInterestedInHangerData() {
    this.adminService.getInterestedInHangerData().then(results => {
      if (results.status === 200) {
        this.interestedInHangerForSaleData = results.hangerInterests;
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Interested in Hangers for Sale Data', results.message, null);
      }
    });
  }

  public markInterestedInHangerAsFollowedUpClicked(hangerItem: GetInterestedInHangerDataResponse.HangerInterests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Edit interested in hanger request', `Are you sure you want to mark the request for hanger ${hangerItem.hangerNumber} as followed up?`, null, this.markInterestedInHangerAsFollowedUp.bind(this, hangerItem));
  }

  public markInterestedInHangerAsFollowedUp(hangerItem: GetInterestedInHangerDataResponse.HangerInterests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.editInterestedInHangerData(hangerItem.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit interested in hanger request', results.message, null);
          this.getInterestedInHangerData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit interested in hanger request', results.message, null);
        }
      });
    }
  }

  public deleteInterestedInHangerClicked(hangerItem: GetInterestedInHangerDataResponse.HangerInterests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete interested in hanger request', `Are you sure you want to delete the request for hanger ${hangerItem.hangerNumber}?`, null, this.deleteInterestedInHanger.bind(this, hangerItem));
  }

  public deleteInterestedInHanger(hangerItem: GetInterestedInHangerDataResponse.HangerInterests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteInterestedInHangerData(hangerItem.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete interested in hanger request', results.message, null);
          this.getInterestedInHangerData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete interested in hanger request', results.message, null);
        }
      });
    }
  }

  public exportToExcel() {
    this.adminService.exportAsExcelFile(this.interestedInHangerForSaleData, 'Interest In Hangars For Sale');
  }
}
