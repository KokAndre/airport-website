import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { NavBarItems } from 'src/app/models/nav-bar-items.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';
import { TokenService } from 'src/app/services/token/token.service';

enum DocumentsToDisplayEnum {
  RunwayInfo = 'runwayInfo',
  EmergencyContacts = 'emergencyContacts',
  SalesBrochure = 'salesBrochure',
  ParamotorPilots = 'aramotorPilots',
  GroundOperations = 'groundOperations',
  NOTAMSNewTab = 'notamsnewTab',
  CircuitProcedures = 'circuitProcedures',
  JoiningAndLanding = 'joiningAndLanding',
  DensityAltitude = 'densityAltitude',
  TrackMeNewTab = 'trackMeNewTab'
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
  public navBarItems: NavBarItems.NavLink[];

  @Input() public isAuthorised = false;
  @Input() public isUserAdmin = false;
  @Input() public isSuperAdmin = false;
  @Input() public isMobileView = false;
  @Input() public hasCompletedGettingToKnowYou = false;

  // @ViewChild('drawer') public drawer;

  constructor(public router: Router,
    public loginService: LoginService,
    public appModalService: AppModalService,
    public tokenService: TokenService) {
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
    this.tokenService.logoutUser();
    // this.router.navigateByUrl(AppRoutes.Home);

    const currentRoute = this.router.url;
    if (currentRoute.includes('/members') || currentRoute.includes('/admin')) {
      this.router.navigateByUrl(AppRoutes.Home);
    }
  }

  public displayDocument(documentToDisplay: DocumentsToDisplayEnum) {
    switch (documentToDisplay) {
      case DocumentsToDisplayEnum.RunwayInfo:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Runway Info', '../../../assets/documents/20241205 - Tedderfielf Airpark - Runway Information as at January 2024.pdf', null);
        break;
      case DocumentsToDisplayEnum.EmergencyContacts:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Emergency Contacts', '../../../assets/documents/20241205  - FATA Emergency Contacts.pdf', null);
        break;
      case DocumentsToDisplayEnum.SalesBrochure:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Tedderfield Sales Brochure', '../../../assets/documents/20241120-Tedderfield_Sales_Brochure_v2.pdf', null);
        break;
      case DocumentsToDisplayEnum.ParamotorPilots:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Paramotor Pilots', '../../../assets/documents/Paramotor Pilots.pdf', null);
        break;
      case DocumentsToDisplayEnum.GroundOperations:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Ground Operations', '../../../assets/documents/20241028 - Tedderfield Airpark - Ground Operations - as at FEB 2024.pdf', null);
        break;
      case DocumentsToDisplayEnum.NOTAMSNewTab:
        AppHelperFunction.openDocumentInNewTab('https://www.b4flight.co.za/');
        break;
      case DocumentsToDisplayEnum.CircuitProcedures:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Circuit Procedures', '../../../assets/documents/circuit-procedures-document.pdf', null);
        break;
      case DocumentsToDisplayEnum.JoiningAndLanding:
        AppHelperFunction.openDocumentInNewTab('https://wiki.ivao.aero/en/home/training/documentation/Joining_an_aerodrome_circuit');
        break;
      case DocumentsToDisplayEnum.DensityAltitude:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Density Altitude', '../../../assets/documents/20241103-Density_Altitude_Poster_for_FATA.pdf', null);
        break;
      case DocumentsToDisplayEnum.TrackMeNewTab:
        AppHelperFunction.openDocumentInNewTab('https://www.safelytrack.me/');
        break;
    }

  }
}
