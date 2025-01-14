import { Component, OnInit } from '@angular/core';
import { GetReportIssueDataResponse } from 'src/app/models/get-report-issue-data-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-report-issue-requests',
  templateUrl: './report-issue-requests.component.html',
  styleUrls: ['./report-issue-requests.component.scss']
})
export class ReportIssueRequestsComponent implements OnInit {
  public reportIssueRequests: GetReportIssueDataResponse.Requests[];
  public allowAdminToDelete = false;

  constructor(private adminService: AdminService, private appModalService: AppModalService, public loginService: LoginService) { }

  ngOnInit() {
    this.getReportIssueData();
    this.checkIfAdminIsAllowedToDelete();
  }

  private checkIfAdminIsAllowedToDelete() {
    const userDetails = this.loginService.getLoggedInUserDetails();
    if (userDetails?.email === 'nic.rfp@gmail.com') {
     this.allowAdminToDelete = true; 
    } else {
      this.allowAdminToDelete = false;
    }
  }

  public getReportIssueData() {
    this.adminService.getReportIssueData().then((results: GetReportIssueDataResponse.RootObject) => {
      if (results.status === 200) {
        this.reportIssueRequests = results.requests;
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Report Issue Data', results.message, null);
      }
    });
  }

  public markIssueAsFollowedUpClicked(reportIssueRequest: GetReportIssueDataResponse.Requests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Edit Report Issue Request', `Are you sure you want to mark the Issue for ${reportIssueRequest.name} as followed up?`, null, this.markIssueAsFollowedUp.bind(this, reportIssueRequest));
  }

  public markIssueAsFollowedUp(reportIssueRequest: GetReportIssueDataResponse.Requests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.editReportIssueEntry(reportIssueRequest.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit Report Issue Request', results.message, null);
          this.getReportIssueData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit Report Issue Request', results.message, null);
        }
      });
    }
  }

  public deleteReportIssueRequestClicked(reportIssueRequest: GetReportIssueDataResponse.Requests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Report Issue Request', `Are you sure you want to delete the Issue for ${reportIssueRequest.name}?`, null, this.deleteReportIssueRequest.bind(this, reportIssueRequest));
  }

  public deleteReportIssueRequest(reportIssueRequest: GetReportIssueDataResponse.Requests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteReportIssueEntry(reportIssueRequest.id).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Report Issue Request', results.message, null);
          this.getReportIssueData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Report Issue Request', results.message, null);
        }
      });
    }
  }

  public exportToExcel() {
    this.adminService.exportAsExcelFile(this.reportIssueRequests, 'Report Issue Requests');
  }

}
