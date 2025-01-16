import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { FollowUsRequest } from 'src/app/models/follow-us-request.model';
import { ReportIssueRequest } from 'src/app/models/report-issue-request.model';
import { AboutUsService } from 'src/app/modules/about-us/services/about-us.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { MembersService } from '../../services/members.service';
import { LoginToken } from 'src/app/models/login-token.model';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-report-an-issue',
  templateUrl: './report-an-issue.component.html',
  styleUrls: ['./report-an-issue.component.scss']
})
export class ReportAnIssueComponent implements OnInit {
  public reportIssueFormGroup: FormGroup;
  public appHelperFunctions = AppHelperFunction;
  public isWereHereToHelpExpanded = true;
  public isHowItWorksExpanded = true;
  public isReportFormExpanded = true;
  public loggedInUserDetails: LoginToken;

  constructor(private formBuilder: FormBuilder,
    private membersService: MembersService,
    public appModalService: AppModalService,
  public loginService: LoginService) { }

  ngOnInit() {
    this.getUserData();
    this.initializeFollowUsControls();
  }

  public getUserData() {
    this.loggedInUserDetails = this.loginService.getLoggedInUserDetails();
  }

  public initializeFollowUsControls() {
    this.reportIssueFormGroup = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      hangerOrsectionNumberControl: new FormControl('', [Validators.required]),
      descriptionControl: new FormControl('', [Validators.required]),
    });
    this.prePopulateData();
  }

  public prePopulateData() {
    if (this.loggedInUserDetails?.name && this.loggedInUserDetails?.surname) {
      this.nameControl.setValue(this.loggedInUserDetails.name + ' ' + this.loggedInUserDetails.surname);
      this.nameControl.disable();
    } else {
      this.nameControl.setValue('');
      this.nameControl.enable();
    }

    if (this.loggedInUserDetails?.email) {
      this.emailControl.setValue(this.loggedInUserDetails.email);
      this.emailControl.disable();
    } else {
      this.emailControl.setValue('');
      this.emailControl.enable();
    }
  }

  public submitClicked() {
    const requestData = new ReportIssueRequest.RootObject();
    requestData.name = this.nameControl?.value;
    requestData.email = this.emailControl?.value;
    requestData.hangerOrSectionNumber = this.hangerOrsectionNumberControl?.value;
    requestData.issueDescription = this.descriptionControl?.value;

    this.membersService.submitReportIssue(requestData).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Report Issue', results.message, null);
      if (results.status === 200) {
        this.clearFormData();
      }
    });
  }

  public clearFormData() {
    this.nameControl?.setValue('');
    this.nameControl?.reset();
    this.emailControl?.setValue('');
    this.emailControl?.reset();
    this.hangerOrsectionNumberControl?.setValue('');
    this.hangerOrsectionNumberControl?.reset();
    this.descriptionControl?.setValue('');
    this.descriptionControl?.reset();
    this.prePopulateData();
  }

  public get nameControl() {
    return this.reportIssueFormGroup.get('nameControl');
  }
  public get emailControl() {
    return this.reportIssueFormGroup.get('emailControl');
  }
  public get hangerOrsectionNumberControl() {
    return this.reportIssueFormGroup.get('hangerOrsectionNumberControl');
  }
  public get descriptionControl() {
    return this.reportIssueFormGroup.get('descriptionControl');
  }

}
