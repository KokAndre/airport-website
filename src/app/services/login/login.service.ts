import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AppRoutes, EncryptionKeys, Endpoints, ModalTypes, SessionStorageKeys, UserDataInTokenToReturn } from 'src/app/enums/app.enums';
import { AppHelperFunction, SessionStorageHelper } from 'src/app/helpers/app-helper.functions';
import { LoginRequest } from 'src/app/models/login-request.model';
import { LoginToken } from 'src/app/models/login-token.model';
import { RegisterRequest } from 'src/app/models/register-request.model';
import * as CryptoJS from 'crypto-js';
import { AppModalService } from '../app-modal/app-modal.service';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';
import { Router } from '@angular/router';
import { UpdateMemberDataRequest } from 'src/app/models/update-user-data-request';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // public loggedInUser: string;

  constructor(public http: HttpClient, public appModalService: AppModalService, public router: Router, public tokenService: TokenService) {
  }

  public checkWhitelisting(userEmail: string) {
    return this.http.post(Endpoints.NewBaseURL + Endpoints.CheckWhitelisting, { userEmail: userEmail });
  }

  public registerNewUser(requestData: RegisterRequest) {
    return this.http.post(Endpoints.NewBaseURL + Endpoints.Register, { requestData: requestData }) as Observable<any>;
  }

  public loginUser(requestData: LoginRequest) {
    return this.http.post(Endpoints.NewBaseURL + Endpoints.Login, { requestData: requestData }) as Observable<any>;
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

  public sendResetPasswordEmail(userEmail: string) {
    return this.http.post(Endpoints.NewBaseURL + Endpoints.SendPasswordResetEmail, { requestData: { email: userEmail } }) as Observable<any>;
    // return fetch(Endpoints.BaseURL + Endpoints.SendPasswordResetEmail, {
    //   method: 'post',
    //   body: JSON.stringify({ requestData: { email: userEmail } })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     return data;
    //   });
  }

  public submitResetPassword(userEmail: string, newPassword: string, resetCode: number) {
    const requestData = {
      email: userEmail,
      password: newPassword,
      resetCode: +resetCode
    };

    return this.http.post(Endpoints.NewBaseURL + Endpoints.SubmitPasswordReset, { requestData: requestData }) as Observable<any>;
    // return fetch(Endpoints.BaseURL + Endpoints.SubmitPasswordReset, {
    //   method: 'post',
    //   body: JSON.stringify({ requestData: requestData })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.status === 200) {
    //       this.tokenService.setToken(data.access_token);
    //       // this.updateLoginToken(data.data);
    //     }
    //     return data;
    //   });
  }

  public updateMemberData(memberData: UpdateMemberDataRequest.RootObject) {
    return this.http.post(Endpoints.NewBaseURL + Endpoints.UpdateMemberData, { requestData: memberData }) as Observable<any>;
  }

  //TODO: Implemnt token refresh
  // public refresAuthToken() {
  //   const userId = this.tokenService.getUserData(UserDataInTokenToReturn.ID) as number;

  //   return this.http.post(Endpoints.NewBaseURL + Endpoints.TestEnpoint, { requestData: { email: userId } }) as Observable<any>;
  // }
}
