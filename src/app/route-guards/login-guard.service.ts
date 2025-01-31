import { inject, Injectable } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from '../enums/app.enums';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.loginService.isAuthorised();

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl(AppRoutes.Home);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(LoginGuardService).canActivate(next, state);
}