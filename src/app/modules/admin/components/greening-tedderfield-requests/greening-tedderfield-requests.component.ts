import { Component, OnInit } from '@angular/core';
import { GetGreeningTedderfieldDataResponse } from 'src/app/models/get-greening-tedderfield-data-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-greening-tedderfield-requests',
  templateUrl: './greening-tedderfield-requests.component.html',
  styleUrls: ['./greening-tedderfield-requests.component.scss']
})
export class GreeningTedderfieldRequestsComponent implements OnInit {
  public greeningTeddderfieldRequests = new Array<GetGreeningTedderfieldDataResponse.Requests>();

  constructor(private adminService: AdminService, private appModalService: AppModalService) { }

  ngOnInit() {
    this.getGreeningTedderfieldData();
  }

  public getGreeningTedderfieldData() {
    this.adminService.getGreeningTedderfieldData().then((results: GetGreeningTedderfieldDataResponse.RootObject) => {
      if (results.status === 200) {
        this.greeningTeddderfieldRequests = results.requests;
        console.log('Follow Us data: ', this.greeningTeddderfieldRequests);
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Greening Tedderfield Data', results.message, null);
      }
    });
  }

  public markRequestAsFollowedUpClicked(greeningTedderfieldRequestItem: GetGreeningTedderfieldDataResponse.Requests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Edit Greening Tedderfield Request', `Are you sure you want to mark the request for ${greeningTedderfieldRequestItem.name} as followed up?`, null, this.markRequestAsFollowedUp.bind(this, greeningTedderfieldRequestItem));
  }

  public markRequestAsFollowedUp(greeningTedderfieldRequestItem: GetGreeningTedderfieldDataResponse.Requests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.editGreeningTedderfieldEntry(greeningTedderfieldRequestItem.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit Greening Tedderfield Request', results.message, null);
          this.getGreeningTedderfieldData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit Greening Tedderfield Request', results.message, null);
        }
      });
    }
  }

  public deleteGreeningTedderfieldRequestClicked(greeningTedderfieldRequestData: GetGreeningTedderfieldDataResponse.Requests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Greening Tedderfield Request', `Are you sure you want to delete the request for ${greeningTedderfieldRequestData.name}?`, null, this.deleteGreeningTedderfieldRequest.bind(this, greeningTedderfieldRequestData));
  }

  public deleteGreeningTedderfieldRequest(greeningTedderfieldRequestData: GetGreeningTedderfieldDataResponse.Requests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteGreeningTedderfieldEntry(greeningTedderfieldRequestData.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Greening Tedderfield Request', results.message, null);
          this.getGreeningTedderfieldData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Greening Tedderfield Request', results.message, null);
        }
      });
    }
  }

}
