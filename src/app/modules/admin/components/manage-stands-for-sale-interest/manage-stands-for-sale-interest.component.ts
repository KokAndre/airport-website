import { Component, OnInit } from '@angular/core';
import { GetInterestedInStandDataResponse } from 'src/app/models/get-interested-in-stand-data-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-manage-stands-for-sale-interest',
  templateUrl: './manage-stands-for-sale-interest.component.html',
  styleUrls: ['./manage-stands-for-sale-interest.component.scss']
})
export class ManageStandsForSaleInterestComponent implements OnInit {
  public interestedInStandForSaleData = new Array<GetInterestedInStandDataResponse.StandInterests>();

  constructor(public adminService: AdminService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getInterestedInStandData();
  }

  public getInterestedInStandData() {
    this.adminService.getInterestedInStandData().then(results => {
      if (results.status === 200) {
        this.interestedInStandForSaleData = results.standInterests;
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Interested in stand for Sale Data', results.message, null);
      }
    });
  }

  public markInterestedInStandAsFollowedUpClicked(standItem: GetInterestedInStandDataResponse.StandInterests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Edit interested in stand request', `Are you sure you want to mark the request for stand ${standItem.standNumber} as followed up?`, null, this.markInterestedInStandAsFollowedUp.bind(this, standItem));
  }

  public markInterestedInStandAsFollowedUp(standItem: GetInterestedInStandDataResponse.StandInterests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.editInterestedInStandData(standItem.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit interested in stand request', results.message, null);
          this.getInterestedInStandData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit interested in stand request', results.message, null);
        }
      });
    }
  }

  public deleteInterestedInStandClicked(standItem: GetInterestedInStandDataResponse.StandInterests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete interested in stand request', `Are you sure you want to delete the request for stand ${standItem.standNumber}?`, null, this.deleteInterestedInStand.bind(this, standItem));
  }

  public deleteInterestedInStand(standItem: GetInterestedInStandDataResponse.StandInterests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteInterestedInStandData(standItem.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete interested in stand request', results.message, null);
          this.getInterestedInStandData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete interested in stand request', results.message, null);
        }
      });
    }
  }

  public exportToExcel() {
    this.adminService.exportAsExcelFile(this.interestedInStandForSaleData, 'Interest In Stands For Sale');
  }

}
