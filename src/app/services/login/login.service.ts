import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/enums/app.enums';
import { LoginRequest } from 'src/app/models/login-request.model';
import { RegisterRequest } from 'src/app/models/register-request.model';

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
    });
  }





}
