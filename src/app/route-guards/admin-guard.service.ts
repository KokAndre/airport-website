import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppRoutes, UserDataInTokenToReturn } from '../enums/app.enums';
import { TokenService } from '../services/token/token.service';
import { LoginGuardService } from './login-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUserAdmin = this.tokenService.getUserData(UserDataInTokenToReturn.isAdmin);

    if (isUserAdmin) {
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