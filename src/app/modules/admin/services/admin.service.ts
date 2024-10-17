import { Injectable } from '@angular/core';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UploadImageRequest } from 'src/app/models/upload-image-request.model';
import { Endpoints } from 'src/app/enums/app.enums';
import { CreateSectionRequest } from 'src/app/models/create-section-request.model';
import { DeleteImageRequest } from 'src/app/models/delete-image-request.model';
import { DeleteSectionRequest } from 'src/app/models/delete-section-request.model';
import { EditSectionRequest } from 'src/app/models/edit-section-request.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public appModalService: AppModalService, public loginService: LoginService) { }

  public uploadNewImage(sectionId: string, imageSrc: string, imageName: string) {
    const requestData = new UploadImageRequest.RootObject();
    requestData.sectionId = sectionId;
    requestData.imageName = imageName;
    requestData.imageData = imageSrc;
    requestData.userId = this.loginService.getLoggedInUserId();

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

}
