import { Injectable } from '@angular/core';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UploadImageRequest } from 'src/app/models/upload-image-request.model';
import { Endpoints } from 'src/app/enums/app.enums';
import { CreateSectionRequest } from 'src/app/models/create-section-request.model';
import { DeleteImageRequest } from 'src/app/models/delete-image-request.model';
import { DeleteSectionRequest } from 'src/app/models/delete-section-request.model';
import { EditSectionRequest } from 'src/app/models/edit-section-request.model';
import { UpdateFollowUsItemRequest } from 'src/app/models/update-follow-us-item-request.model';
import { UpdateReportIssueItemRequest } from 'src/app/models/update-report-issue-item-request.model';
import { UpdateGreeningTedderfieldItemRequest } from 'src/app/models/update-greening-tedderfield-item-request.model';
import { AddHomePageBannerRequest } from 'src/app/models/add-home-page-banner-request.model';
import { UpdateInterestedInPropertyItemRequest } from 'src/app/models/update-interested-in-property-item-request.model';
import { GetLeviesResponse } from 'src/app/models/get-levies-response.model';




import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { UploadMembersDocumentsRequest } from 'src/app/models/upload-members-documents-request.model';
import { CreateMembersDocumentsFolderRequest } from 'src/app/models/create-members-documents-folder-request.model';
import { UpdateInterestedInClassifiedsItemRequest } from 'src/app/models/update-interested-in-classifieds-item-request.model';
import { RenameFolderRequest } from 'src/app/models/rename-folder-request.model';
import { MembersDataResponse } from 'src/app/models/get-members-response.model';
import { UpdateMembersRequest } from 'src/app/models/update-members-request.model';
import { UpdateIssueConfigRequest } from 'src/app/models/update-issue-config-request.model';
import { GetHangersForSaleReponse } from 'src/app/models/get-hangers-for-sale-reponse.model';
import { GetStandsForSaleReponse } from 'src/app/models/get-stands-for-sale-reponse.model';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public appModalService: AppModalService, public loginService: LoginService) { }

  public uploadNewImages(sectionId: string, imageData: UploadImageRequest.FileData[]) {
    const requestData = new UploadImageRequest.RootObject;
    requestData.sectionId = sectionId;
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.filesArray = new Array<UploadImageRequest.FileData>();
    requestData.filesArray = imageData;

    return fetch(Endpoints.BaseURL + Endpoints.UploadImage, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public uploadNewImageAsFile(sectionId: string, fileData: any) {
    const userId = this.loginService.getLoggedInUserId();
    let fileDataToUpload: FormData = new FormData();
    fileDataToUpload.append('file', fileData);
    fileDataToUpload.append('name', fileData.name);
    fileDataToUpload.append('userId', `${userId}`);
    fileDataToUpload.append('sectionId', `${sectionId}`);

    return fetch(Endpoints.BaseURL + Endpoints.UploadImageAsFile, {
      method: 'post',
      body: fileDataToUpload
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }


  public createSection(title: string, description: string) {
    const requestData = new CreateSectionRequest.RootObject();
    requestData.title = title;
    requestData.description = description;
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.CreateGallerySection, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getGalleryData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetGalleryData, {
      method: 'get'
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteImage(imageId: string, imageName: string) {
    const requestData = new DeleteImageRequest.RootObject();
    requestData.imageName = imageName;
    requestData.id = imageId;
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.DeleteImage, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteSection(sectionId: string) {
    const requestData = new DeleteSectionRequest.RootObject();
    requestData.sectionId = sectionId;
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.DeleteSection, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public editSection(sectionId: string, title: string, description: string) {
    const requestData = new EditSectionRequest.RootObject();
    requestData.sectionId = sectionId;
    requestData.title = title;
    requestData.description = description;
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.EditSection, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getFollowUsData() {
    const requestData = new UpdateFollowUsItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.GetFollowUsData, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteFollowUsEntry(followUsRequestId: string) {
    const requestData = new UpdateFollowUsItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.followUsId = followUsRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.DeleteFollowUsItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public editFollowUsEntry(followUsRequestId: string) {
    const requestData = new UpdateFollowUsItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.followUsId = followUsRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.MarkFollowUsAsFollowedUp, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getReportIssueData() {
    const requestData = new UpdateReportIssueItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.GetReportIssueData, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getReportIssueConfigData() {
    const requestData = new UpdateReportIssueItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.GetReportIssueConfigData, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteReportIssueEntry(reportIssueRequestId: string) {
    const requestData = new UpdateReportIssueItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.reportIssueId = reportIssueRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.DeleteReportIssueItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  // public editReportIssueEntry(reportIssueRequestId: string) {
  //   const requestData = new UpdateReportIssueItemRequest.RootObject();
  //   requestData.userId = this.loginService.getLoggedInUserId();
  //   requestData.reportIssueId = reportIssueRequestId;

  //   return fetch(Endpoints.BaseURL + Endpoints.MarkReportIssueAsFollowedUp, {
  //     method: 'post',
  //     body: JSON.stringify({ requestData: requestData })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       return data;
  //     });
  // }

  public updateReportIssueCategory(reportIssueRequestId: string, category: string) {
    const requestData = new UpdateReportIssueItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.reportIssueId = reportIssueRequestId;
    requestData.reportIssueCategory = category;

    return fetch(Endpoints.BaseURL + Endpoints.UpdateReportIssueCategory, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public updateReportIssuePersonResponsible(reportIssueRequestId: string, personResponsible: string) {
    const requestData = new UpdateReportIssueItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.reportIssueId = reportIssueRequestId;
    requestData.personResponsible = personResponsible;

    return fetch(Endpoints.BaseURL + Endpoints.UpdateReportIssuePersonResponsible, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public updateReportIssueStatus(reportIssueRequestId: string, status: string) {
    const requestData = new UpdateReportIssueItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.reportIssueId = reportIssueRequestId;
    requestData.status = status;

    return fetch(Endpoints.BaseURL + Endpoints.UpdateReportIssueStatus, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public updateReportIssueData(reportIssueRequestId: string, hangarOrSectionNumber: string, issueDescription: string) {
    const requestData = new UpdateReportIssueItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.reportIssueId = reportIssueRequestId;
    requestData.hangarOrSectionNumber = hangarOrSectionNumber;
    requestData.issueDescription = issueDescription;

    return fetch(Endpoints.BaseURL + Endpoints.UpdateReportIssueData, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getGreeningTedderfieldData() {
    const requestData = new UpdateGreeningTedderfieldItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.GetGreeningTedderfieldData, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteGreeningTedderfieldEntry(greeninfTedderfieldRequestId: string) {
    const requestData = new UpdateGreeningTedderfieldItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.greeningItemId = greeninfTedderfieldRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.DeleteGreeningTedderfieldItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public editGreeningTedderfieldEntry(greeninfTedderfieldRequestId: string) {
    const requestData = new UpdateGreeningTedderfieldItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.greeningItemId = greeninfTedderfieldRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.MarkGreeningTedderfieldAsFollowedUp, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getHomePageBanner() {
    return fetch(Endpoints.BaseURL + Endpoints.GetHomePageBanner, {
      method: 'get'
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteHomeScreenBanner() {
    const requestData = new AddHomePageBannerRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    return fetch(Endpoints.BaseURL + Endpoints.DeleteHomePageBanner, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public addHomeScreenBanner(fileName: string, fileData: string) {
    const requestData = new AddHomePageBannerRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.fileName = fileName;
    requestData.fileData = fileData;
    return fetch(Endpoints.BaseURL + Endpoints.AddNewHomeScreenBanner, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public addHomeScreenBannerAsFile(fileData: any) {
    // const requestData = new AddHomePageBannerRequest.RootObject();
    const userId = this.loginService.getLoggedInUserId();
    let fileDataToUpload: FormData = new FormData();
    fileDataToUpload.append('file', fileData);
    fileDataToUpload.append('name', fileData.name);
    fileDataToUpload.append('userId', `${userId}`);

    return fetch(Endpoints.BaseURL + Endpoints.AddNewHomeScreenBannerAsFile, {
      method: 'post',
      body: fileDataToUpload
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteHangerForSaleItem(hangerId: number) {
    return fetch(Endpoints.BaseURL + Endpoints.DeleteHangerForSaleItem, {
      method: 'post',
      body: JSON.stringify({ id: hangerId })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public approveHangerForSaleItem(hangerData: GetHangersForSaleReponse.Hanger) {
    const requestData = new GetHangersForSaleReponse.Hanger();
    requestData.id = hangerData.id;
    requestData.name = hangerData.name;
    requestData.email = hangerData.email;
    return fetch(Endpoints.BaseURL + Endpoints.ApproveHangerForSaleItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteStandForSaleItem(standId: number) {
    return fetch(Endpoints.BaseURL + Endpoints.DeleteStandForSaleItem, {
      method: 'post',
      body: JSON.stringify({ id: standId })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }
  
  public approveStandForSaleItem(standData: GetStandsForSaleReponse.Stands) {
    const requestData = new GetStandsForSaleReponse.Stands();
    requestData.id = standData.id;
    requestData.name = standData.name;
    requestData.email = standData.email;
    return fetch(Endpoints.BaseURL + Endpoints.ApproveStandForSaleItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getInterestedInHangerData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetInterestedInHangerData, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public editInterestedInHangerData(interestedInHangerRequestId: number) {
    const requestData = new UpdateInterestedInPropertyItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.propertyItemId = interestedInHangerRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.MarkInterestedInHangerAsFollowedUp, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteInterestedInHangerData(interestedInHangerRequestId: number) {
    const requestData = new UpdateInterestedInPropertyItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.propertyItemId = interestedInHangerRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.DeleteInterestedInHangerItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getInterestedInStandData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetInterestedInStandData, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public editInterestedInStandData(interestedInStandRequestId: number) {
    const requestData = new UpdateInterestedInPropertyItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.propertyItemId = interestedInStandRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.MarkInterestedInStandAsFollowedUp, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteInterestedInStandData(interestedInStandRequestId: number) {
    const requestData = new UpdateInterestedInPropertyItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.propertyItemId = interestedInStandRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.DeleteInterestedInStandItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getLeviesData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetLeviesData, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public addLieviesItem(levieItems: GetLeviesResponse.Levie) {
    const levieItemRequestData = JSON.parse(JSON.stringify(levieItems));
    levieItemRequestData.userId = this.loginService.getLoggedInUserId();
    levieItemRequestData.isForHangars = levieItemRequestData.isForHangars ? '1' : '0';
    levieItemRequestData.isForStands = levieItemRequestData.isForStands ? '1' : '0';
    return fetch(Endpoints.BaseURL + Endpoints.AddLeviItem, {
      method: 'post',
      body: JSON.stringify({ requestData: levieItemRequestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public updateLieviesItem(levieItems: GetLeviesResponse.Levie) {
    const levieItemRequestData = JSON.parse(JSON.stringify(levieItems));
    levieItemRequestData.userId = this.loginService.getLoggedInUserId();
    levieItemRequestData.isForHangars = levieItemRequestData.isForHangars ? '1' : '0';
    levieItemRequestData.isForStands = levieItemRequestData.isForStands ? '1' : '0';
    return fetch(Endpoints.BaseURL + Endpoints.UpdateLeviesData, {
      method: 'post',
      body: JSON.stringify({ requestData: levieItemRequestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteLieviesItem(id: number) {
    const userId = this.loginService.getLoggedInUserId();
    return fetch(Endpoints.BaseURL + Endpoints.DeleteLevieItem, {
      method: 'post',
      body: JSON.stringify({ requestData: { id: id, userId: userId } })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public exportAsExcelFile(json: any, excelFileName: string): void {
    const downloadName = `${excelFileName} as at ${moment(new Date()).format('DD-MM-yyyy - HH:mm')}`;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, downloadName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public uploadMembersDocuments(uploadedMembersDocuments: UploadMembersDocumentsRequest.FileData, fileRoute: string) {
    let documentToUploadData: FormData = new FormData();
    documentToUploadData.append('file', uploadedMembersDocuments.fileData);
    documentToUploadData.append('name', uploadedMembersDocuments.fileName);
    documentToUploadData.append('fileRoute', fileRoute);
    documentToUploadData.append('userId', this.loginService.getLoggedInUserId());

    return fetch(Endpoints.BaseURL + Endpoints.UploadMembersDocument, {
      method: 'post',
      body: documentToUploadData
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public createMembersDocumentsFolder(folderData: CreateMembersDocumentsFolderRequest.RootObject) {
    folderData.userId = this.loginService.getLoggedInUserId();
    return fetch(Endpoints.BaseURL + Endpoints.CreateMembersDocumentsFolder, {
      method: 'post',
      body: JSON.stringify({ requestData: folderData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteMembersDocumentsFile(filePath: string) {
    const userId = this.loginService.getLoggedInUserId();
    return fetch(Endpoints.BaseURL + Endpoints.DeletMembersDocumentsFile, {
      method: 'post',
      body: JSON.stringify({ requestData: { userId: userId, filePath: filePath } })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteMembersDocumentsFolder(folderPath: string) {
    const userId = this.loginService.getLoggedInUserId();
    return fetch(Endpoints.BaseURL + Endpoints.DeletMembersDocumentsFolder, {
      method: 'post',
      body: JSON.stringify({ requestData: { userId: userId, folderPath: folderPath } })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public renameMembersDocumentsFolder(folderData: RenameFolderRequest) {
    folderData.userId = this.loginService.getLoggedInUserId();
    return fetch(Endpoints.BaseURL + Endpoints.RenameMembersDocumentsFolder, {
      method: 'post',
      body: JSON.stringify({ requestData: folderData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getClassifiedsData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetClassifiedsData, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteClassifiedsForSaleItem(classifiedsId: number) {
    return fetch(Endpoints.BaseURL + Endpoints.DeleteClassifiedsForSaleItem, {
      method: 'post',
      body: JSON.stringify({ id: classifiedsId })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getInterestedInClassifiedsData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetInterestedInClassifiedsData, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public editInterestedInClassifiedsData(interestedInClassifiedsRequestId: number) {
    const requestData = new UpdateInterestedInClassifiedsItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.classifiedsItemId = interestedInClassifiedsRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.MarkInterestedInClassifiedsAsFollowedUp, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteInterestedInClassifiedsData(interestedInHangerRequestId: number) {
    const requestData = new UpdateInterestedInClassifiedsItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.classifiedsItemId = interestedInHangerRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.DeleteInterestedInClassifiedsItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getMembersData() {
    const userId = this.loginService.getLoggedInUserId();
    return fetch('http://localhost/teddefield-airfield-test/members/get-members.php', {
      method: 'post',
      body: JSON.stringify({ requestData: { userId: userId } })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteMember(memberId: number) {
    const requestData = new MembersDataResponse.Member
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.id = memberId;

    return fetch(Endpoints.BaseURL + Endpoints.DeleteMember, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public addNewMemberMember(memberData: UpdateMembersRequest.RootObject) {
    let requestData = new UpdateMembersRequest.RootObject
    requestData = memberData;
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.AddNewMember, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public manageMembersUpdateMemberData(memberData: UpdateMembersRequest.RootObject) {
    let requestData = new UpdateMembersRequest.RootObject
    requestData = memberData;
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.ManageMembersUpdateMemberData, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteIssueCategory(categoryId: number) {
    let requestData = new UpdateIssueConfigRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.categoryId = categoryId;

    return fetch(Endpoints.BaseURL + Endpoints.DeleteReportIssueCategory, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public addIssueCategory(category: string) {
    let requestData = new UpdateIssueConfigRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.category = category;

    return fetch(Endpoints.BaseURL + Endpoints.AddReportIssueCategory, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public deleteIssueResponsiblePerson(responsiblePersonId: number) {
    let requestData = new UpdateIssueConfigRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.responsiblePersonId = responsiblePersonId;

    return fetch(Endpoints.BaseURL + Endpoints.DeleteReportIssuePersonResponsible, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public addIssuePersonResponsible(personResponsible: string) {
    let requestData = new UpdateIssueConfigRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.responsiblePersonName = personResponsible;

    return fetch(Endpoints.BaseURL + Endpoints.AddReportIssuePersonResponsible, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

}
