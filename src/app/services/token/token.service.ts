import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/login',
    register: 'http://127.0.0.1:8000/api/auth/register',
  };

  constructor() { }

  public setToken(token: any) {
    localStorage.setItem('auth_token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public payload(token: any) {
    const jwtPayload = token.split('.')[1];
    if (jwtPayload){
      return JSON.parse(atob(jwtPayload));
    }
  }

  // User state based on valid token
  public isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  public removeToken() {
    localStorage.removeItem('auth_token');
  }
}
