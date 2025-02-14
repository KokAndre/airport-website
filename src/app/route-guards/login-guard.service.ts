import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppRoutes } from '../enums/app.enums';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.tokenService.isLoggedIn();

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