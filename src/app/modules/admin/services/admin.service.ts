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

  public createSection(title: string, description: string) {
    const requestData = new CreateSectionRequest.RootObject();
    requestData.title = title;
    requestData.description = description;
    requestData.userId = this.loginService.getLoggedInUserId();

    console.log('REQUEST DATA: ', requestData);

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

  public editReportIssueEntry(reportIssueRequestId: string) {
    const requestData = new UpdateReportIssueItemRequest.RootObject();
    requestData.userId = this.loginService.getLoggedInUserId();
    requestData.reportIssueId = reportIssueRequestId;

    return fetch(Endpoints.BaseURL + Endpoints.MarkReportIssueAsFollowedUp, {
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
}
