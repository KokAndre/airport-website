import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/enums/app.enums';
import { SubmitInterestedInPropertyRequest } from 'src/app/models/submit-interested-in-property-request.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyForSaleService {

  constructor() { }

  public getHangerForSaleData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetHangersForSales, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getHangerForSaleTitleDocument(id: number) {
    return fetch(Endpoints.BaseURL + Endpoints.GetHangerTitleDocument, {
      method: 'post',
      body: JSON.stringify({ id: id })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getHangerForSaleFloorPlanDocument(id: number) {
    return fetch(Endpoints.BaseURL + Endpoints.GetHangerFloorPlanDocument, {
      method: 'post',
      body: JSON.stringify({ id: id })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitInterestedInHangerData(requestData: SubmitInterestedInPropertyRequest) {
    return fetch(Endpoints.BaseURL + Endpoints.SubmitInterestedInHanger, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getStandsForSaleData() {
    return fetch(Endpoints.BaseURL + Endpoints.GetStandsForSales, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public getStandForSaleTitleDocument(id: number) {
    return fetch(Endpoints.BaseURL + Endpoints.GetStandTitleDocument, {
      method: 'post',
      body: JSON.stringify({ id: id })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitInterestedInStandData(requestData: SubmitInterestedInPropertyRequest) {
    return fetch(Endpoints.BaseURL + Endpoints.SubmitInterestedInStand, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

}
