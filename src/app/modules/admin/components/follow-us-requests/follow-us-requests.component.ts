import { Component, OnInit } from '@angular/core';
import { GetFollowUsDataResponse } from 'src/app/models/get-follow-us-data-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-follow-us-requests',
  templateUrl: './follow-us-requests.component.html',
  styleUrls: ['./follow-us-requests.component.scss']
})
export class FollowUsRequestsComponent implements OnInit {
  public followUsRequests = new Array<GetFollowUsDataResponse.Requests>();

  constructor(private adminService: AdminService, private appModalService: AppModalService) { }

  ngOnInit() {
    this.getFollowUsData();
  }

  public getFollowUsData() {
    this.adminService.getFollowUsData().then((results: GetFollowUsDataResponse.RootObject) => {
      if (results.status === 200) {
        this.followUsRequests = results.requests;
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Follow Us Data', results.message, null);
      }
    });
  }

  public markRequestAsFollowedUpClicked(followUsRequest: GetFollowUsDataResponse.Requests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Edit Follow Us Request', `Are you sure you want to mark the request for ${followUsRequest.name} as followed up?`, null, this.markRequestAsFollowedUp.bind(this, followUsRequest));
  }

  public markRequestAsFollowedUp(followUsRequest: GetFollowUsDataResponse.Requests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.editFollowUsEntry(followUsRequest.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit Follow Us Request', results.message, null);
          this.getFollowUsData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit Follow Us Request', results.message, null);
        }
      });
    }
  }

  public deleteFollowUpRequestClicked(followUsRequest: GetFollowUsDataResponse.Requests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Follow Us Request', `Are you sure you want to delete the request for ${followUsRequest.name}?`, null, this.deleteFollowUpRequest.bind(this, followUsRequest));
  }

  public deleteFollowUpRequest(followUsRequest: GetFollowUsDataResponse.Requests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteFollowUsEntry(followUsRequest.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Follow Us Request', results.message, null);
          this.getFollowUsData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Follow Us Request', results.message, null);
        }
      });
    }
  }

  public testDownload() {
    const data = [
      { Name: 'John Doe', Age: 30, City: 'New York' },
      { Name: 'Jane Smith', Age: 25, City: 'San Francisco' },
    ];
    this.adminService.generateExcel(data, 'user_data');
  }

}
