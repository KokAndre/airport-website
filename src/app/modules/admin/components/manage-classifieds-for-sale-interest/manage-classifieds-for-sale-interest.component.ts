import { Component, OnInit } from '@angular/core';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetInterestedInClassifiedsDataResponse } from 'src/app/models/get-interested-in-classifieds-data-response.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-classifieds-for-sale-interest',
  templateUrl: './manage-classifieds-for-sale-interest.component.html',
  styleUrls: ['./manage-classifieds-for-sale-interest.component.scss']
})
export class ManageClassifiedsForSaleInterestComponent implements OnInit {
  public interestInClassifiedsData: GetInterestedInClassifiedsDataResponse.Classified[];

  constructor(public adminService: AdminService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getInterestedInClassifiedsData();
  }

  public getInterestedInClassifiedsData() {
    this.adminService.getInterestedInClassifiedsData().then(results => {
      if (results.status === 200) {
        this.interestInClassifiedsData = results.classifieds;
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Interested in Classifieds for Sale Data', results.message, null);
      }
    });
  }

  public markInterestedInClassifiedsAsFollowedUpClicked(classifiedsItem: GetInterestedInClassifiedsDataResponse.Classified) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Edit interested in classifieds request', `Are you sure you want to mark the request for classifieds as followed up?`, null, this.markInterestedInClassifiedsAsFollowedUp.bind(this, classifiedsItem));
  }

  public markInterestedInClassifiedsAsFollowedUp(classifiedsItem: GetInterestedInClassifiedsDataResponse.Classified, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.editInterestedInClassifiedsData(classifiedsItem.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit interested in classifieds request', results.message, null);
          this.getInterestedInClassifiedsData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit interested in classifieds request', results.message, null);
        }
      });
    }
  }

  public deleteInterestedInClassifiedsClicked(classifiedsItem: GetInterestedInClassifiedsDataResponse.Classified) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete interested in classifieds request', `Are you sure you want to delete the request for interest in classifieds?`, null, this.deleteInterestedInClassifieds.bind(this, classifiedsItem));
  }

  public deleteInterestedInClassifieds(classifiedsItem: GetInterestedInClassifiedsDataResponse.Classified, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteInterestedInClassifiedsData(classifiedsItem.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete interested in classifieds request', results.message, null);
          this.getInterestedInClassifiedsData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete interested in classifieds request', results.message, null);
        }
      });
    }
  }

  public exportToExcel() {
    this.adminService.exportAsExcelFile(this.interestInClassifiedsData, 'Interest In Classifieds For Sale');
  }

}
