import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/enums/app.enums';
import { SubmitInterestedInClassifiedsRequest } from 'src/app/models/submit-interested-in-classifieds-request.model';

@Injectable({
  providedIn: 'root'
})
export class FataMerchService {

  constructor(public http: HttpClient) { }

  public getClassifiedsData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetClassifiedsData, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitInterestedInItem(requestData: SubmitInterestedInClassifiedsRequest) {
    return fetch(Endpoints.BaseURL + Endpoints.SubmitInterestedInClassifiedsItem, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

}
