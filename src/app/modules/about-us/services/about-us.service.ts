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
      // if (data.status === 200) {
      //   const tokenToStore = new LoginToken();
      //   tokenToStore.name = data.data.name;
      //   tokenToStore.surname = data.data.surname;
      //   tokenToStore.loginDateTime = new Date().toISOString();
      //   tokenToStore.logoutDateTime = moment(new Date()).add(30, 'm').toISOString();

      //   const encryptedToken = AppHelperFunction.encryptToken(tokenToStore);

      //   SessionStorageHelper.storeItem(SessionStorageKeys.Token, encryptedToken);
      // }
      return data;
    });
}

}
