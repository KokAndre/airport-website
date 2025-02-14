import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppRoutes, UserDataInTokenToReturn } from '../enums/app.enums';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class HasCompletedGettingToKnowYouGuardService {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasCompletedGettingToKnowYou = this.tokenService.getUserData(UserDataInTokenToReturn.HasCompletedGettingToKnowYou);

    if (hasCompletedGettingToKnowYou) {
      return true;
    } else {
      this.router.navigateByUrl(AppRoutes.GettingToKnowYou);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(HasCompletedGettingToKnowYouGuardService).canActivate(next, state);
}