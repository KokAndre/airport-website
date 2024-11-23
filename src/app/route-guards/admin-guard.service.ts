import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AppRoutes } from '../enums/app.enums';
import { LoginGuardService } from './login-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.loginService.isLogedInUserAdmin(true);

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