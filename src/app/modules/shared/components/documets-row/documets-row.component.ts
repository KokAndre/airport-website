import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { CreateMembersDocumentsFolderRequest } from 'src/app/models/create-members-documents-folder-request.model';
import { GetDocumentsResponse } from 'src/app/models/get-documents-response.model';
import { RenameFolderRequest } from 'src/app/models/rename-folder-request.model';
import { SellMyHangerRequest } from 'src/app/models/sell-my-hanger-request.model';
import { UploadMembersDocumentsRequest } from 'src/app/models/upload-members-documents-request.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-documets-row',
  templateUrl: './documets-row.component.html',
  styleUrls: ['./documets-row.component.scss']
})
export class DocumetsRowComponent implements OnInit {
  @Input() public currentLevelFileData: GetDocumentsResponse.Folder;
  @Input() public isFromAdmin: boolean;
  @Input() public isBaseLevel: boolean;
  @Output() public fileClickedEmit = new EventEmitter<string>();
  @Output() public fileUploadedEmit = new EventEmitter<UploadMembersDocumentsRequest.RootObject>();
  @Output() public createFolderEmit = new EventEmitter<CreateMembersDocumentsFolderRequest.RootObject>();
  @Output() public deleteFileEmit = new EventEmitter<string>();
  @Output() public deleteFolderEmit = new EventEmitter<string>();
  @Output() public renameFolderEmit = new EventEmitter<RenameFolderRequest>();

  constructor(public appModalService: AppModalService) { }

  ngOnInit() {
  }

  public fileClicked(currentRoute: string) {
    const routeToEmit = `${this.currentLevelFileData.name}/${currentRoute}`
    this.fileClickedEmit.emit(routeToEmit);
  }

  public setUploadedDocumentData(documentData: UploadMembersDocumentsRequest.FileData[], currentFilePath: string) {
    const dataToEmit = new UploadMembersDocumentsRequest.RootObject;
    dataToEmit.fileData = documentData;
    dataToEmit.filePath = currentFilePath;

    this.fileUploadedEmit.emit(dataToEmit);
  }

  public emitFileUploaded(uploadedFileData: UploadMembersDocumentsRequest.RootObject) {
    uploadedFileData.filePath = `${this.currentLevelFileData.name}/${uploadedFileData.filePath}`;
    this.fileUploadedEmit.emit(uploadedFileData);
  }

  public addFolderClicked() {
    this.appModalService.ShowConfirmationModal(ModalTypes.AddFolderModal, 'Add Folder', '', null, this.addFolderModalOutcome.bind(this))
  }

  public addFolderModalOutcome(modalOutcome: string, folderNmae: string) {
    if (modalOutcome === ModalOutcomeOptions.Update && folderNmae) {

      const dataToEmit = new CreateMembersDocumentsFolderRequest.RootObject();
      dataToEmit.folderName = folderNmae;
      dataToEmit.folderPath = this.currentLevelFileData.name;

      this.createFolderEmit.emit(dataToEmit);
    }
  }

  public emitFolderUploaded(folderData: CreateMembersDocumentsFolderRequest.RootObject) {
    const newFolderFilePath = `${this.currentLevelFileData.name}/${folderData.folderPath}`;
    folderData.folderPath = newFolderFilePath;
    this.createFolderEmit.emit(folderData);
  }

  public deleteFileClicked(fileName: string) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Document', `Are you sure you want to delete the following document:<br>${fileName}`, null, this.deleteFileOutcome.bind(this, fileName))
  }

  public deleteFileOutcome(fileName: string, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      const fileToDeletePath = `${this.currentLevelFileData.name}/${fileName}`;
      this.deleteFileEmit.emit(fileToDeletePath);
    }
  }

  public emitFileToDelete(filePath: string) {
    const fileToDeletePath = `${this.currentLevelFileData.name}/${filePath}`;
    this.deleteFileEmit.emit(fileToDeletePath);
  }

  public deleteFolderClicked(folderName: string) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Document', `Are you sure you want to delete the following folder and all it's content:<br>${folderName}`, null, this.deleteFolderOutcome.bind(this, folderName))
  }

  public deleteFolderOutcome(folderName: string, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.deleteFolderEmit.emit(folderName);
    }
  }

  public emitFolderToDelete(folderePath: string) {
    const fileToDeletePath = `${this.currentLevelFileData.name}/${folderePath}`;
    this.deleteFolderEmit.emit(fileToDeletePath);
  }

  public editFolderNameClicked() {
    this.appModalService.ShowConfirmationModal(ModalTypes.AddFolderModal, 'Rename Folder', `${this.currentLevelFileData.name}`, null, this.editFolderNameOutcome.bind(this))
  }

  public editFolderNameOutcome(modalOutcome: string, folderNmae: string) {
    if (modalOutcome === ModalOutcomeOptions.Update && folderNmae) {

      const dataToEmit = new RenameFolderRequest();
      dataToEmit.folderBasePath = '';
      dataToEmit.folderNewName = folderNmae;
      dataToEmit.folderOldName = this.currentLevelFileData.name;

      this.renameFolderEmit.emit(dataToEmit);
    }
  }

  public emitRenameFolder(folderData: RenameFolderRequest) {
    folderData.folderBasePath = `${this.currentLevelFileData.name}/${folderData.folderBasePath}`;
    this.renameFolderEmit.emit(folderData);
  }

}
