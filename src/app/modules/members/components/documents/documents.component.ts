import { Component, OnInit } from '@angular/core';
import { GetDocumentsResponse } from 'src/app/models/get-documents-response.model';
import { MembersService } from '../../services/members.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { Endpoints, ModalTypes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  public isDocumentsPanelExpanded = true;
  public documentsData: GetDocumentsResponse.Folder;
  public isLoading = true;

  constructor(private membersService: MembersService, private appModalService: AppModalService) { }

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

}
