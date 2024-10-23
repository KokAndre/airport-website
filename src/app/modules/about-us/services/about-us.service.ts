import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/enums/app.enums';

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

}
