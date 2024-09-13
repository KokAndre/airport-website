import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppRoutes } from 'src/app/enums/app.enums';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public currentRoute: string;
  public navigationRoutes = AppRoutes;
  
  @Input() public isAuthorised = false;

  constructor(public router: Router, public loginService: LoginService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }


  ngOnInit() {
  }

  public navigateToRoute(newRoute: string) {
    this.router.navigateByUrl(newRoute);
  }

  public logout() {
    this.loginService.logoutUser();
  }

}
