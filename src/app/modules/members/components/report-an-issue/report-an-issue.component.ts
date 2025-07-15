import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { LoginToken } from 'src/app/models/login-token.model';
import { ReportIssueRequest } from 'src/app/models/report-issue-request.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { TokenService } from 'src/app/services/token/token.service';
import { MembersService } from '../../services/members.service';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';

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
  public loggedInUserDetails: GetUserDataResponse.Data;
  public uploadedDocumentsList: ReportIssueRequest.FileDataModel[];
  public maxFileSize = 100000000;

  @ViewChild('fileUploaderTester', { static: true }) fileUploaderTester: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private membersService: MembersService,
    public appModalService: AppModalService,
    public tokenService: TokenService) { }

  ngOnInit() {
    this.uploadedDocumentsList = new Array<ReportIssueRequest.FileDataModel>();
    this.getUserData();
    this.initializeFollowUsControls();
  }

  public getUserData() {
    this.loggedInUserDetails = this.tokenService.getUserData() as GetUserDataResponse.Data;
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

  public deleteFileItem(fileToDelete: string) {
    this.uploadedDocumentsList = this.uploadedDocumentsList.filter(x => x.fileName !== fileToDelete);
  }

  public handleClick() {
    this.fileUploaderTester.nativeElement.click();
  }

  public uploadDocument(event: any) {
    let files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      if (file.size <= this.maxFileSize) {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const fileDataToAdd = new ReportIssueRequest.FileDataModel();
          fileDataToAdd.fileName = file.name;
          fileDataToAdd.fileData = file;
          this.uploadedDocumentsList.push(fileDataToAdd);
        }
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Max file size exceeded', 'The file you selected is to big. The max file size is: ' + (this.maxFileSize / 1000000) + 'MB', null);
      }
    }
  }

  public submitClicked() {
    const requestData = new ReportIssueRequest.RootObject();
    requestData.name = this.nameControl?.value;
    requestData.email = this.emailControl?.value;
    requestData.hangerOrSectionNumber = this.hangerOrsectionNumberControl?.value;
    requestData.issueDescription = this.descriptionControl?.value.replaceAll("'", '’');

    this.membersService.submitReportIssue(requestData).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Report Issue', results.message, null);
      if (results.status === 200) {
        if (this.uploadedDocumentsList?.length) {
          this.uploadFiles(results.itemId);
        } else {
          this.clearFormData();
        }
      }
    });
  }

  public async uploadFiles(issueId: number) {
    await this.uploadedDocumentsList.forEach(async doc => {
      await this.membersService.uploadReportIssueDocument(issueId, doc.fileData).then(results => {
        if (results.status === 200) {
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Document', results.message, null);
        }
      });
    });
    this.clearFormData();
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
    this.uploadedDocumentsList = new Array<ReportIssueRequest.FileDataModel>();
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
