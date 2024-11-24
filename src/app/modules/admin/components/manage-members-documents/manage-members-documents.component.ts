import { Component, OnInit } from '@angular/core';
import { ModalTypes } from 'src/app/enums/app.enums';
import { GetDocumentsResponse } from 'src/app/models/get-documents-response.model';
import { UploadMembersDocumentsRequest } from 'src/app/models/upload-members-documents-request.model';
import { MembersService } from 'src/app/modules/members/services/members.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { AdminService } from '../../services/admin.service';
import { CreateMembersDocumentsFolderRequest } from 'src/app/models/create-members-documents-folder-request.model';

@Component({
  selector: 'app-manage-members-documents',
  templateUrl: './manage-members-documents.component.html',
  styleUrls: ['./manage-members-documents.component.scss']
})
export class ManageMembersDocumentsComponent implements OnInit {
  public isDocumentsPanelExpanded = true;
  public documentsData: GetDocumentsResponse.Folder;
  public isLoading = true;

  constructor(private membersService: MembersService, private appModalService: AppModalService, private adminService: AdminService) { }

  ngOnInit() {
    this.getDocumentsData();
  }

  public getDocumentsData() {
    this.membersService.getMemebersDocuments().then(results => {
      if (results.status === 200) {
        this.documentsData = results.documentData;
        this.setLevelExpanded(this.documentsData, true);
        console.log('DOCUMENT DATA TO DISPLAY: ', this.documentsData);
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Members Documents', results.message, null);
      }
    });
  }
  
  public setLevelExpanded(currentLevel: GetDocumentsResponse.Folder, isFirstLevel: boolean) {
    currentLevel.isExpanded = isFirstLevel ? true : false;

    currentLevel.folders.forEach(level => {
      this.setLevelExpanded(level, false);
    });
  }

  public openFile(fileRoute: string) {
    this.membersService.getMembersDocumentBase64(fileRoute).then(results => {
      if (results.status === 200) {
        let documentPathPieces = fileRoute.split('/');
        let documentName = documentPathPieces[documentPathPieces?.length - 1];
        const urlForModal = 'data:application/pdf;base64,' + results.fileData;

        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, documentName, urlForModal, null);
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Members Document', results.message, null);
      }
    });

  }

  public async fileUploaded(uploadedFileData: UploadMembersDocumentsRequest.RootObject) {
    console.log('UPLOADED DOCUMENTS: ', uploadedFileData);

    let isAllDocumentsUploaded = true;
    let errorMessage = 'Error uploading the following documents:'

    for (let index = 0; index < uploadedFileData.fileData.length; index++) {
      const fileData = uploadedFileData.fileData[index];
      await this.adminService.uploadMembersDocuments(fileData, uploadedFileData.filePath).then(results => {
        if (results.status !== 200) {
          isAllDocumentsUploaded = false;
          errorMessage += `<br><br>${fileData.fileName}`;
        }
      });
      
      if (index === uploadedFileData.fileData.length - 1) {
        if (isAllDocumentsUploaded) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Documents', 'All documents uploaded successfully.', null);
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Documents', errorMessage ? errorMessage : 'There was an issue uploading all of the files.', null);
        }
        this.getDocumentsData();
      }
    }
  }

  public createFOlder(folderData: CreateMembersDocumentsFolderRequest.RootObject) {
    console.log('DATA TO SUBMIT FOLDER CREATE: ', folderData);

    this.adminService.createMembersDocumentsFolder(folderData).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Create Folder', results.message, null);
      if (results.status === 200) {
        this.getDocumentsData();
      }
    });
  }

  public deleteFile(filePath: string) {
    this.adminService.deleteMembersDocumentsFile(filePath).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete File', results.message, null);
      if (results.status === 200) {
        this.getDocumentsData();
      }
    });
  }
}
