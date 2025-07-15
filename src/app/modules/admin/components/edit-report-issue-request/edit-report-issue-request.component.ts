import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GetReportIssueDataResponse } from 'src/app/models/get-report-issue-data-response.model';
import { ReportIssueRequest } from 'src/app/models/report-issue-request.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-report-issue-request',
  templateUrl: './edit-report-issue-request.component.html',
  styleUrls: ['./edit-report-issue-request.component.scss']
})
export class EditReportIssueRequestComponent implements OnInit {
  public editReportIssueData: GetReportIssueDataResponse.Requests;
  public uploadedDocumentsList = new Array<ReportIssueRequest.FileDataModel>();
  public maxFileSize = 100000000;
  public originalEditReportIssueData: GetReportIssueDataResponse.Requests;
  public categoryList: GetReportIssueDataResponse.Category[];
  public priorityList: GetReportIssueDataResponse.priorityList[];
  public responsiblePersonList: GetReportIssueDataResponse.ResponsiblePerson[];
  public allowAdminToDelete: boolean;

  @Input() public editIssueData: any;


  @Output() public cancelClickedEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() public updatIssueDataEmit: EventEmitter<GetReportIssueDataResponse.Requests> = new EventEmitter<GetReportIssueDataResponse.Requests>();
  @Output() public deleteFileEmit: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('fileUploaderTester', { static: true }) fileUploaderTester: ElementRef;

  constructor(public adminService: AdminService) { }

  ngOnInit() {

    this.originalEditReportIssueData = this.editIssueData.issueData;
    this.editReportIssueData = this.editIssueData.categoryList;
    this.priorityList = this.editIssueData.priorityList;
    this.responsiblePersonList = this.editIssueData.responsiblePersonList;
    this.categoryList = this.editIssueData.categoryList;
    this.allowAdminToDelete = this.editIssueData.allowAdminToDelete;


    this.editReportIssueData = JSON.parse(JSON.stringify(this.originalEditReportIssueData));

    console.log('ORIGINAL DATA: ', this.originalEditReportIssueData);

    this.editReportIssueData.documents?.forEach(x => {
      const fileDataToPush = new ReportIssueRequest.FileDataModel();
      fileDataToPush.fileName = x;

      this.uploadedDocumentsList.push(fileDataToPush);
    });
  }

  public estimatedCompletionDateChanged(newEtc: string) {
    this.editReportIssueData.estimatedCompletionDate = newEtc;
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
          // const fileData = reader.result || '';
          const fileDataToAdd = new ReportIssueRequest.FileDataModel();
          fileDataToAdd.fileName = file.name;
          fileDataToAdd.fileData = file;
          this.uploadedDocumentsList.push(fileDataToAdd);
        }
      }
    }
  }

  public isUpdateDisabled() {
    if (!this.editReportIssueData.hangerOrSectionNumber || !this.editReportIssueData.issueDescription) {
      return true;
    }

    let isButtonDisabled = true;

    if (this.editReportIssueData.hangerOrSectionNumber !== this.originalEditReportIssueData.hangerOrSectionNumber ||
      this.editReportIssueData.issueDescription !== this.originalEditReportIssueData.issueDescription ||
      this.editReportIssueData.category !== this.originalEditReportIssueData.category ||
      this.editReportIssueData.priority !== this.originalEditReportIssueData.priority ||
      this.editReportIssueData.personResponsible !== this.originalEditReportIssueData.personResponsible ||
      this.editReportIssueData.personResponsibleTwo !== this.originalEditReportIssueData.personResponsibleTwo ||
      this.editReportIssueData.status !== this.originalEditReportIssueData.status ||
      this.editReportIssueData.estimatedCompletionDate !== this.originalEditReportIssueData.estimatedCompletionDate) {
      isButtonDisabled = false;
    }

    if (this.uploadedDocumentsList.find(x => x.fileData)) {
      isButtonDisabled = false;
    }

    return isButtonDisabled;
  }

  public deleteFileItemClicked(fileToDelete: string) {
    if (this.uploadedDocumentsList.find(x => x.fileName === fileToDelete)?.fileData) {
      this.uploadedDocumentsList = this.uploadedDocumentsList.filter(x => x.fileName !== fileToDelete);
    } else {
      this.adminService.deleteReportIssueDocument(fileToDelete, this.editReportIssueData.id).then(results => {
        if (results.status === 200) {
          this.uploadedDocumentsList = this.uploadedDocumentsList.filter(x => x.fileName !== fileToDelete);
          this.editReportIssueData.documents = this.editReportIssueData.documents?.filter(x => x !== fileToDelete);
          this.deleteFileEmit.emit(fileToDelete);
        }
      });
    }
  }

  public updateReportIssueData() {
    this.adminService.updateReportIssueData(this.editReportIssueData).then(results => {
      if (results.status === 200) {
        this.uploadFiles();
      }
    });
  }

  public uploadFiles() {
    this.uploadedDocumentsList.forEach(doc => {
      // Only new files will have file data
      if (doc.fileData) {
        this.adminService.uploadReportIssueDocument(this.editReportIssueData.id, doc.fileData).then(results => {
          if (results.status === 200) {
            this.editReportIssueData.documents.push(doc.fileName);
          }
        });
      }
    });

    this.updatIssueDataEmit.emit(this.editReportIssueData);
  }

  public cancelClicked() {
    this.cancelClickedEmit.emit();
  }

}
