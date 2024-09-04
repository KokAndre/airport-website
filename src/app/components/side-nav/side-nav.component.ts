import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/enums/app.enums';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  public navigationRoutes = AppRoutes;
  public displayHeaderAsSolid = false;
  public checkIsAuthInterval: any;
  public isAuthorised = false;

  constructor(public router: Router, public loginService: LoginService) { }

  ngOnInit() {
    this.initializeIsLoggedInCheck()
  }

  ngOnDestroy(): void {
    this.checkIsAuthInterval = null;
    this.loginService.logoutUser();
  }

  public navigateToRoute(newRoute: string) {
    this.router.navigateByUrl(newRoute);
  }

  public setHeaderColour(event: any) {
    // console.log('Scroll Event: ', event.srcElement.scrollTop);
    
    if(event?.srcElement?.scrollTop > 10) {
      this.displayHeaderAsSolid = true;
    } else {
      this.displayHeaderAsSolid = false;
    }
  }

  public initializeIsLoggedInCheck() {
    this.checkIsAuthInterval = setInterval(() => {
      this.isAuthorised = this.loginService.isAuthorised();
      // console.log('IS AUTH: ', this.isAuthorised);
    }, 1000);
  }

  public logout() {
    this.loginService.logoutUser();
  }

}
