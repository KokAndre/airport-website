import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/enums/app.enums';
import { ReportIssueRequest } from 'src/app/models/report-issue-request.model';
import { SellMyHangerRequest } from 'src/app/models/sell-my-hanger-request.model';
import { SellMyStandRequest } from 'src/app/models/sell-my-stand-request.model';
import { SubmitClassifiedsRequest } from 'src/app/models/submit-classifieds-request.model';
import { SubmitGettingToKnowYouRequest } from 'src/app/models/submit-getting-to-know-you-request.model';
import { SubmitGreeningTedderfieldRequest } from 'src/app/models/submit-greening-tedderfield-request.model';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(public http: HttpClient, public loginService: LoginService) { }

  public submitReportIssue(reportIssueData: ReportIssueRequest.RootObject) {
    return fetch(Endpoints.BaseURL + Endpoints.ReportIssue, {
      method: 'post',
      body: JSON.stringify({ requestData: reportIssueData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitGreeningTedderfield(reportIssueData: SubmitGreeningTedderfieldRequest.RootObject) {
    return fetch(Endpoints.BaseURL + Endpoints.SubmitGreeninTedderfield, {
      method: 'post',
      body: JSON.stringify({ requestData: reportIssueData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitSellMyHanger(sellMyHangerRequestData: SellMyHangerRequest.RootObject) {
    // Remove files to ensure request is not to big.
    const requestData = JSON.parse(JSON.stringify(sellMyHangerRequestData))
    if (requestData.titleDocument){
      requestData.titleDocument.fileData = '';
    } else {
      requestData.titleDocument = new SellMyHangerRequest.FileData
    }

    if (requestData.detailedFloorPlan){
      requestData.detailedFloorPlan.fileData = '';
    } else {
      requestData.detailedFloorPlan = new SellMyHangerRequest.FileData
    }

    requestData.hangerImages.forEach(x => {
      x.fileData = '';
    });

    return fetch(Endpoints.BaseURL + Endpoints.SubmitSellMyHanger, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public uploadSellMyHangerTitleDocument(sellMyHangerId: number, fileData: any) {
    let testData: FormData = new FormData();
    testData.append('file', fileData);
    testData.append('name', fileData.name);
    testData.append('sellMyHangerId', `${sellMyHangerId}`);

    return fetch(Endpoints.BaseURL + Endpoints.UploadSellMyHangerTitleDocument, {
      method: 'post',
      body: testData
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public uploadSellMyHangerFloorPlanDocument(sellMyHangerId: number, fileData: any) {
    let testData: FormData = new FormData();
    testData.append('file', fileData);
    testData.append('name', fileData.name);
    testData.append('sellMyHangerId', `${sellMyHangerId}`);

    return fetch(Endpoints.BaseURL + Endpoints.uploadSellMyHangerFloorPlanDocument, {
      method: 'post',
      body: testData
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public uploadSellMyHangerImages(sellMyHangerId: number, fileData: any) {
    let testData: FormData = new FormData();
    testData.append('file', fileData);
    testData.append('name', fileData.name);
    testData.append('sellMyHangerId', `${sellMyHangerId}`);

    return fetch(Endpoints.BaseURL + Endpoints.uploadSellMyHangerImages, {
      method: 'post',
      body: testData
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitSellMyStand(dellMyStandRequestData: SellMyStandRequest.RootObject) {
    // Remove files to ensure request is not to big.
    const requestData = JSON.parse(JSON.stringify(dellMyStandRequestData))
    requestData.titleDocument.fileData = '';
    requestData.standImages.forEach(x => {
      x.fileData = '';
    });

    return fetch(Endpoints.BaseURL + Endpoints.SubmitSellMyStand, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public uploadSellMyStandTitleDocument(sellMyStandId: number, doc: any) {
    let testData: FormData = new FormData();
    testData.append('file', doc);
    testData.append('name', doc.name);
    testData.append('sellMyStandId', `${sellMyStandId}`);

    return fetch(Endpoints.BaseURL + Endpoints.UploadSellMyStandTitleDocument, {
      method: 'post',
      body: testData
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public uploadSellMyStandImages(sellMyStandId: number, doc: any) {
    let testData: FormData = new FormData();
    testData.append('file', doc);
    testData.append('name', doc.name);
    testData.append('sellMyStandId', `${sellMyStandId}`);

    return fetch(Endpoints.BaseURL + Endpoints.uploadSellMyStandImages, {
      method: 'post',
      body: testData
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
  
  public getMemebersDocuments() {
    return fetch(Endpoints.BaseURL + Endpoints.GetMemebersDocuments, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getMembersDocumentBase64(documentRoute: string) {
    const requestData = {filePath: documentRoute};

    return fetch(Endpoints.BaseURL + Endpoints.GetMemebersDocumentBase64, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitClassifiedsItem(classifiedsItemRequestData: SubmitClassifiedsRequest.RootObject) {
    // Remove files to ensure request is not to big.
    const requestData = JSON.parse(JSON.stringify(classifiedsItemRequestData));
    requestData.images.forEach(x => {
      x.fileData = '';
    });

    return fetch(Endpoints.BaseURL + Endpoints.ClassifiedsSubmitItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public uploadClassifiedsItemImages(submitAdSucessId: number, image: SubmitClassifiedsRequest.Image) {
    let formData: FormData = new FormData();
    formData.append('file', image.fileData);
    formData.append('name', image.fileName);
    formData.append('classifiedsId', `${submitAdSucessId}`);

    return fetch(Endpoints.BaseURL + Endpoints.ClassifiedsUploadImage, {
      method: 'post',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitGettingToKnowYou(gettingToKnowYouRequestData: SubmitGettingToKnowYouRequest.RootObject) {
    // Remove files to ensure request is not to big.
    const requestData = JSON.parse(JSON.stringify(gettingToKnowYouRequestData));
    requestData.image.fileData = '';
    requestData.userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.SubmitGettingToKnowYou, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public uploadGettingToKnowImage(submitSucessId: number, image: SubmitGettingToKnowYouRequest.Image) {
    let formData: FormData = new FormData();
    formData.append('file', image.fileData);
    formData.append('name', image.fileName);
    formData.append('successId', `${submitSucessId}`);

    return fetch(Endpoints.BaseURL + Endpoints.UploadGettingToKnowYouImage, {
      method: 'post',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getGettingToKnowYouUserData() {
    const userId = this.loginService.getLoggedInUserId();

    return fetch(Endpoints.BaseURL + Endpoints.GetGettingToKnowYouUserData, {
      method: 'post',
      body: JSON.stringify({ requestData: {userId: userId} })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getGettingToKnowYouData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetGettingToKnowYouData, {
      method: 'post'
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }



}
