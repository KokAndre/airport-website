import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';

enum DocumentsToDisplayEnum {
  RunwayInfo = 'runwayInfo',
  EmergencyContacts = 'emergencyContacts',
  SalesBrochure = 'salesBrochure',
  ParamotorPilots = 'aramotorPilots',
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public currentRoute: string;
  public navigationRoutes = AppRoutes;
  public documentsToDisplayEnum = DocumentsToDisplayEnum;

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

  public displayDocument(documentToDisplay: DocumentsToDisplayEnum) {
    switch (documentToDisplay) {
      case DocumentsToDisplayEnum.RunwayInfo:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Runway Info', '../../../assets/documents/FATA-Runway-Information-FATA.pdf', null);
        break;
      case DocumentsToDisplayEnum.EmergencyContacts:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Emergency Contacts', '../../../assets/documents/20240419-FATAEmergencyContacts-FATA-011.pdf', null);
        break;
      case DocumentsToDisplayEnum.SalesBrochure:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Tedderfield Sales Brochure', '../../../assets/documents/20240429-TedderfieldSalesBrochure.pdf', null);
        break;
      case DocumentsToDisplayEnum.ParamotorPilots:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Paramotor Pilots', '../../../assets/documents/Flying-the-Circuit-at-Tedderfield-Airpark-Paramotor-V3.pdf', null);
    }

  }
}
