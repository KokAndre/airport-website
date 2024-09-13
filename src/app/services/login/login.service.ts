import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { EncryptionKeys, Endpoints, SessionStorageKeys } from 'src/app/enums/app.enums';
import { AppHelperFunction, SessionStorageHelper } from 'src/app/helpers/app-helper.functions';
import { LoginRequest } from 'src/app/models/login-request.model';
import { LoginToken } from 'src/app/models/login-token.model';
import { RegisterRequest } from 'src/app/models/register-request.model';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loggedInUser: string;

  constructor(http: HttpClient) {
  }

  public registerNewUser(requestData: RegisterRequest) {
    return fetch(Endpoints.BaseURL + Endpoints.Register, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          const tokenToStore = new LoginToken();
          tokenToStore.name = data.data.name;
          tokenToStore.surname = data.data.surname;
          tokenToStore.loginDateTime = new Date().toISOString();
          tokenToStore.logoutDateTime = moment(new Date()).add(30, 'm').toISOString();

          const encryptedToken = AppHelperFunction.encryptToken(tokenToStore);

          SessionStorageHelper.storeItem(SessionStorageKeys.Token, encryptedToken);
        }
        return data;
      });
  }

  public loginUser(requestData: LoginRequest) {
    return fetch(Endpoints.BaseURL + Endpoints.Login, {
      method: 'post',
      body: JSON.stringify({ requestData: requestData })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          const tokenToStore = new LoginToken();
          tokenToStore.name = data.data.name;
          tokenToStore.surname = data.data.surname;
          tokenToStore.loginDateTime = new Date().toISOString();
          tokenToStore.logoutDateTime = moment(new Date()).add(30, 'm').toISOString();

          const encryptedToken = AppHelperFunction.encryptToken(tokenToStore);

          SessionStorageHelper.storeItem(SessionStorageKeys.Token, encryptedToken);
        }
        return data;
      });
  }

  public logoutUser() {
    SessionStorageHelper.removeItem(SessionStorageKeys.Token);
    this.loggedInUser = '';
  }

  public isAuthorised(returnLoggedInUsername?: boolean) {
    const stringToken = SessionStorageHelper.getItem(SessionStorageKeys.Token);
    if (!stringToken) {
      return false;
    } else {
      const keyHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
      const ivHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
      const decryptedBytes = CryptoJS.AES.decrypt(stringToken, keyHex, { iv: ivHex });
      const dectyptedStringToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const token = JSON.parse(dectyptedStringToken);

      const currentDate = new Date();
      const tokenExpiryDate = new Date(token.logoutDateTime);

      if (currentDate < tokenExpiryDate) {
        if (returnLoggedInUsername) {
          return token.name;
        }
        return true;
      } else {
        this.logoutUser();
        return false;
      }
    }
  }

  public getLoggedInUsername() {
    if (this.loggedInUser) {
      return this.loggedInUser;
    } else if (this.isAuthorised(true)) {
      this.loggedInUser = this.isAuthorised(true);
      return this.loggedInUser;
    } else {
      return '';
    }
  }

}
