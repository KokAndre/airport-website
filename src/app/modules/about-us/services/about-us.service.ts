import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/enums/app.enums';
import { FollowUsRequest } from 'src/app/models/follow-us-request.model';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor() { }

  public fetchWeatherWidgetData() {
    return fetch(Endpoints.SlingCraftWeatherWidget, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitFollowUsForm(followUsData: FollowUsRequest.RootObject) {
    return fetch(Endpoints.BaseURL + Endpoints.SubmitFollowUsRequest, {
      method: 'post',
      body: JSON.stringify({ requestData: followUsData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

}
