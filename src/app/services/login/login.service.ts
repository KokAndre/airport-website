import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { EncryptionKeys, Endpoints, SessionStorageKeys } from 'src/app/enums/app.enums';
import { SessionStorageHelper } from 'src/app/helpers/app-helper.functions';
import { LoginRequest } from 'src/app/models/login-request.model';
import { LoginToken } from 'src/app/models/login-token.model';
import { RegisterRequest } from 'src/app/models/register-request.model';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(http: HttpClient) {
  }

  public registerNewUser(requestData: RegisterRequest) {
    return fetch(Endpoints.BaseURL + Endpoints.Register, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    });
  }

  public loginUser(requestData: LoginRequest) {
    return fetch(Endpoints.BaseURL + Endpoints.Login, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        if (data.responseCode === 200) {
          const tokenToStore = new LoginToken();
          tokenToStore.name = data.name;
          tokenToStore.surname = data.surname;
          tokenToStore.loginDateTime = new Date().toISOString();
          tokenToStore.logoutDateTime = moment(new Date()).add(30, 'm').toISOString();

          console.log('TOKEN: ', tokenToStore);

          const stringToken = JSON.stringify(tokenToStore);

          const encryptedToken = CryptoJS.AES.encrypt(stringToken, EncryptionKeys.TokenEncryptionKey).toString();

          SessionStorageHelper.storeItem(SessionStorageKeys.Token, encryptedToken);

          return data;
        }
      });
  }

  public logoutUser() {
    SessionStorageHelper.removeItem(SessionStorageKeys.Token);
  }

  public isAuthorised() {
    const stringToken = SessionStorageHelper.getItem(SessionStorageKeys.Token);
    if (!stringToken) {
      return false;
    } else {
      const decryptedBytes = CryptoJS.AES.decrypt(stringToken, EncryptionKeys.TokenEncryptionKey);
      const dectyptedStringToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
      console.log('DECRYPTED STRING TOKEN: ', dectyptedStringToken);
      const token = JSON.parse(dectyptedStringToken);

      console.log('DECRYPTED JSON TOKEN: ', token);

      const currentDate = new Date();
      const tokenExpiryDate = new Date(token.logoutDateTime);

      if (currentDate < tokenExpiryDate) {
        return true;
      } else {
        this.logoutUser();
        return false;
      }
    }
  }



}
