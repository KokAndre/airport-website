import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
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

  constructor(public router: Router, public loginService: LoginService, public appModalService: AppModalService) {
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

  public displayRunwayInfoDocument() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Runway Info', 'assets/documents/FATA-Runway-Information-FATA.pdf', null);
  }

  public displayEmergencyContactsDocument() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Emergency Contacts', '../../../assets/documents/20240419-FATAEmergencyContacts-FATA-011.pdf', null);
  }

}
