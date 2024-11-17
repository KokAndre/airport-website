import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AppRoutes, EncryptionKeys, Endpoints, ModalTypes, SessionStorageKeys } from 'src/app/enums/app.enums';
import { AppHelperFunction, SessionStorageHelper } from 'src/app/helpers/app-helper.functions';
import { LoginRequest } from 'src/app/models/login-request.model';
import { LoginToken } from 'src/app/models/login-token.model';
import { RegisterRequest } from 'src/app/models/register-request.model';
import * as CryptoJS from 'crypto-js';
import { AppModalService } from '../app-modal/app-modal.service';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loggedInUser: string;

  constructor(http: HttpClient, public appModalService: AppModalService, public router: Router) {
  }

  public checkWhitelisting(userEmail: string) {
    return fetch(Endpoints.BaseURL + Endpoints.CheckWhitelisting, {
      method: 'post',
      body: JSON.stringify({ userEmail: userEmail })
    })
      .then(response => response.json())
      .then((data: GetUserDataResponse.RootObject) => {
        if (data.status !== 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, data.header, data.message, null);
        }
        return data;
      });
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
          tokenToStore.id = data.data.id;
          tokenToStore.isAdmin = data.data.isAdmin;
          tokenToStore.hasCompletedGettingToKnowYou = data.data.hasCompletedGettingToKnowYou;
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
          console.log('USER DATA FOR LoGIN TOKEN: ', data.data);
          const tokenToStore = new LoginToken();
          tokenToStore.name = data.data.name;
          tokenToStore.surname = data.data.surname;
          tokenToStore.id = data.data.id;
          tokenToStore.email = data.data.email;
          tokenToStore.phoneNumber = data.data.phoneNumber;
          tokenToStore.isAdmin = data.data.isAdmin;
          tokenToStore.hasCompletedGettingToKnowYou = data.data.hasCompletedGettingToKnowYou;
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

  public getLoggedInUserId() {
    const stringToken = SessionStorageHelper.getItem(SessionStorageKeys.Token);
    if (!stringToken) {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'User not legged in', 'You are not logged in. Please login and try again.', null);
      this.router.navigateByUrl(AppRoutes.Home);
    } else {
      const keyHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
      const ivHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
      const decryptedBytes = CryptoJS.AES.decrypt(stringToken, keyHex, { iv: ivHex });
      const dectyptedStringToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const token = JSON.parse(dectyptedStringToken);

      const currentDate = new Date();
      const tokenExpiryDate = new Date(token.logoutDateTime);

      if (currentDate < tokenExpiryDate) {
        return token.id;
      } else {
        this.logoutUser();
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Session expired', 'Your session has expired. Please login and try again.', null);
        this.router.navigateByUrl(AppRoutes.Home);
      }
    }
  }

  public isLogedInUserAdmin() {
    const stringToken = SessionStorageHelper.getItem(SessionStorageKeys.Token);
    if (!stringToken) {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'User not legged in', 'You are not logged in. Please login and try again.', null);
      this.router.navigateByUrl(AppRoutes.Home);
    } else {
      const keyHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
      const ivHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
      const decryptedBytes = CryptoJS.AES.decrypt(stringToken, keyHex, { iv: ivHex });
      const dectyptedStringToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const token = JSON.parse(dectyptedStringToken);

      const currentDate = new Date();
      const tokenExpiryDate = new Date(token.logoutDateTime);

      if (currentDate < tokenExpiryDate) {
        return token.isAdmin;
      } else {
        this.logoutUser();
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Session expired', 'Your session has expired. Please login and try again.', null);
        this.router.navigateByUrl(AppRoutes.Home);
      }
    }
  }

  public getLoggedInUserDetails(skipNavigateToHomeWhenNotLoggedIn?: boolean) {
    const stringToken = SessionStorageHelper.getItem(SessionStorageKeys.Token);
    if (!stringToken) {
      if (!skipNavigateToHomeWhenNotLoggedIn) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'User not legged in', 'You are not logged in. Please login and try again.', null);
        this.router.navigateByUrl(AppRoutes.Home);
      } else {
        return null;
      }
    } else {
      const keyHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
      const ivHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
      const decryptedBytes = CryptoJS.AES.decrypt(stringToken, keyHex, { iv: ivHex });
      const dectyptedStringToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const token = JSON.parse(dectyptedStringToken);

      const currentDate = new Date();
      const tokenExpiryDate = new Date(token.logoutDateTime);

      if (currentDate < tokenExpiryDate) {
        const userdetails = new LoginToken();
        userdetails.id = token.id;
        userdetails.name = token.name;
        userdetails.surname = token.surname;
        userdetails.phoneNumber = token.phoneNumber;
        userdetails.email = token.email;
        return userdetails;
      } else {
        this.logoutUser();
        if (!skipNavigateToHomeWhenNotLoggedIn) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Session expired', 'Your session has expired. Please login and try again.', null);
          this.router.navigateByUrl(AppRoutes.Home);
        } else {
          return null;
        }
      }
    }
  }

  public getHomePageBanner() {
    return fetch(Endpoints.BaseURL + Endpoints.GetHomePageBanner, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

}
