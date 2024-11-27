import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AppRoutes } from '../enums/app.enums';

@Injectable({
  providedIn: 'root'
})
export class HasCompletedGettingToKnowYouGuardService {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasCompletedGettingToKnowYou = this.loginService.checkIfUserHasCompletedGettingToKnowYou();

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