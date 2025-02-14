import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, SessionStorageKeys, UserDataInTokenToReturn } from 'src/app/enums/app.enums';
import { AppHelperFunction, SessionStorageHelper } from 'src/app/helpers/app-helper.functions';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public userData = new GetUserDataResponse.Data;
  private issuer = {
    login: 'https://tedderfield.co.za/tedderfield-api/api/members/login',
    register: 'https://tedderfield.co.za/tedderfield-api/api/members/register',
    localLogin: 'http://localhost/tedderfield-api/public/api/members/login',
    localRegister: 'http://localhost/tedderfield-api/public/api/members/register'
  };

  constructor(public router: Router) { }

  public setToken(token: any) {
    SessionStorageHelper.storeItem(SessionStorageKeys.AuthToken, token);
    this.setUserData();
  }

  public getToken(): string | null {
    const token = SessionStorageHelper.getItem(SessionStorageKeys.AuthToken);
    return token;
  }

  private isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        const isValidISS = Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
        const hasTokenExpired = this.tokenExpired(payload);

        if (isValidISS && !hasTokenExpired) {
          return true;
        } else {
          const currentRoute = this.router.url;
          if (currentRoute.includes('/members') || currentRoute.includes('/admin')) {
            this.router.navigateByUrl(AppRoutes.Home);
          }
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private tokenExpired(payload: any) {
    const expiry = payload.exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  private payload(token: any) {
    const jwtPayload = token.split('.')[1];
    if (jwtPayload) {
      return JSON.parse(atob(jwtPayload));
    }
  }

  // User state based on valid token
  public isLoggedIn() {
    const isTokenValid = this.isValidToken();

    if (isTokenValid) {
      return true;
    } else {
      this.logoutUser();
      return false;
    }
  }

  // Remove token
  private removeToken() {
    // localStorage.removeItem('auth_token');
    SessionStorageHelper.removeItem(SessionStorageKeys.AuthToken);
  }

  public logoutUser() {
    this.removeToken();
    this.userData = new GetUserDataResponse.Data;
  }

  public setUserData() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload?.userData?.id) {
        const userDataToSet = payload.userData;
        userDataToSet.hangarNumbers = AppHelperFunction.splitStringToArray(`${userDataToSet.hangarNumbers}`);
        userDataToSet.standNumbers = AppHelperFunction.splitStringToArray(`${userDataToSet.standNumbers}`);

        this.userData = userDataToSet;
      } else {
        this.userData = new GetUserDataResponse.Data;
      }
    } else {
      this.userData = new GetUserDataResponse.Data;
    }
  }

  public getUserData(dataToReturn?: UserDataInTokenToReturn) {
    if (!this.userData?.id) {

      if (this.isValidToken()) {
        this.setUserData();
      } else {
        this.userData = new GetUserDataResponse.Data;
      }

    }

    switch (dataToReturn) {
      case UserDataInTokenToReturn.ID:
        return this.userData.id;

      case UserDataInTokenToReturn.Name:
        return this.userData.name;

      case UserDataInTokenToReturn.Surname:
        return this.userData.surname;

      case UserDataInTokenToReturn.Email:
        return this.userData.email;

      case UserDataInTokenToReturn.IsRegistered:
        if (this.userData.isRegistered === 1) {
          return true;
        } else {
          return false;
        }

      case UserDataInTokenToReturn.isAdmin:
        if (this.userData.isAdmin === 1 || this.userData.isAdmin === 2) {
          return true;
        } else {
          return false;
        }

      case UserDataInTokenToReturn.IsSuperAdmin:
        if (this.userData.isAdmin === 2) {
          return true;
        } else {
          return false;
        }

      case UserDataInTokenToReturn.HasCompletedGettingToKnowYou:
        if (this.userData.hasCompletedGettingToKnowYou === 1) {
          return true;
        } else {
          return false;
        }

      case UserDataInTokenToReturn.HangarNumbers:
        return this.userData.hangarNumbers;

      case UserDataInTokenToReturn.StandNumbers:
        return this.userData.standNumbers;

      default:
        return this.userData;
    }
  }

  public updateHasCompletedGettingToKnowYou() {
    if (this.userData) {
      this.userData.hasCompletedGettingToKnowYou = 1;
    }
  }

  public refreshToken() {
    //
  }

}
