import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { FollowUsRequest } from 'src/app/models/follow-us-request.model';
import { ReportIssueRequest } from 'src/app/models/report-issue-request.model';
import { AboutUsService } from 'src/app/modules/about-us/services/about-us.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { MembersService } from '../../services/members.service';

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

  constructor(private formBuilder: FormBuilder, private membersService: MembersService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.initializeFollowUsControls();
  }

  public initializeFollowUsControls() {
    this.reportIssueFormGroup = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      hangerOrsectionNumberControl: new FormControl('', [Validators.required]),
      descriptionControl: new FormControl('', [Validators.required]),
    });
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
