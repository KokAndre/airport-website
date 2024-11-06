import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { NavBarItems } from 'src/app/models/nav-bar-items.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';

enum DocumentsToDisplayEnum {
  RunwayInfo = 'runwayInfo',
  EmergencyContacts = 'emergencyContacts',
  SalesBrochure = 'salesBrochure',
  ParamotorPilots = 'aramotorPilots',
  GroundOperations = 'groundOperations',
  NOTAMSNewTab = 'notamsnewTab',
  CircuitProcedures = 'circuitProcedures'
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
  @Input() public isMobileView = false;

  // @ViewChild('drawer') public drawer;

  constructor(public router: Router, public loginService: LoginService, public appModalService: AppModalService) {
    this.initializeNavBarItems();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }


  ngOnInit() {
  }

  public initializeNavBarItems() {
    // Clear variable to ensure no double values
    this.navBarItems = new Array<NavBarItems.NavLink>();

    // Home
    const homeItemToAdd = new NavBarItems.NavLink();
    homeItemToAdd.title = 'Home';
    homeItemToAdd.navLinkToCheck = '/home';
    homeItemToAdd.linkToNavigateTo = this.navigationRoutes.Home;
    homeItemToAdd.displayForAdminOnly = false;
    this.navBarItems.push(homeItemToAdd);

    // About Us
    const aboutUsItemToAdd = new NavBarItems.NavLink();
    aboutUsItemToAdd.title = 'About Us';
    aboutUsItemToAdd.navLinkToCheck = '/about-us';
    aboutUsItemToAdd.displayForAdminOnly = false;
    aboutUsItemToAdd.subItems = new Array<NavBarItems.NavBarSubItems>();

    const aboutUsClubHouseSubItem = new NavBarItems.NavBarSubItems();
    aboutUsClubHouseSubItem.title = 'Club House';
    aboutUsClubHouseSubItem.linkToNavigateTo = this.navigationRoutes.ClubHouse;
    aboutUsClubHouseSubItem.displayForAdminOnly = false;
    aboutUsItemToAdd.subItems.push(aboutUsClubHouseSubItem);

    const aboutUsFollowUsSubItem = new NavBarItems.NavBarSubItems();
    aboutUsFollowUsSubItem.title = 'Follow Us';
    aboutUsFollowUsSubItem.linkToNavigateTo = this.navigationRoutes.FollowUs;
    aboutUsFollowUsSubItem.displayForAdminOnly = false;
    aboutUsItemToAdd.subItems.push(aboutUsFollowUsSubItem);

    const aboutUsTedderfieldHistorySubItem = new NavBarItems.NavBarSubItems();
    aboutUsTedderfieldHistorySubItem.title = 'Tedderfield History';
    aboutUsTedderfieldHistorySubItem.linkToNavigateTo = this.navigationRoutes.TedderfieldHistory;
    aboutUsTedderfieldHistorySubItem.displayForAdminOnly = false;
    aboutUsItemToAdd.subItems.push(aboutUsTedderfieldHistorySubItem);

    const aboutUsEmergencyContactsSubItem = new NavBarItems.NavBarSubItems();
    aboutUsEmergencyContactsSubItem.title = 'Emergency Contacts';
    aboutUsEmergencyContactsSubItem.documentToOpen = this.documentsToDisplayEnum.EmergencyContacts;
    aboutUsEmergencyContactsSubItem.displayForAdminOnly = false;
    aboutUsItemToAdd.subItems.push(aboutUsEmergencyContactsSubItem);

    const aboutUsMissionAndVisionSubItem = new NavBarItems.NavBarSubItems();
    aboutUsMissionAndVisionSubItem.title = 'Mission & Vision Statement';
    aboutUsMissionAndVisionSubItem.linkToNavigateTo = this.navigationRoutes.MissionAndVisionStatement;
    aboutUsMissionAndVisionSubItem.displayForAdminOnly = false;
    aboutUsItemToAdd.subItems.push(aboutUsMissionAndVisionSubItem);

    this.navBarItems.push(aboutUsItemToAdd);

    // Contact Us
    const contactUsItemToAdd = new NavBarItems.NavLink();
    contactUsItemToAdd.title = 'Contact Us';
    contactUsItemToAdd.navLinkToCheck = '/contact-us';
    contactUsItemToAdd.linkToNavigateTo = this.navigationRoutes.ContactUs;
    contactUsItemToAdd.displayForAdminOnly = false;
    this.navBarItems.push(contactUsItemToAdd);

    // Pilot Information
    const pilotInformationToAdd = new NavBarItems.NavLink();
    pilotInformationToAdd.title = 'Pilot Information';
    pilotInformationToAdd.navLinkToCheck = '/pilot-information';
    pilotInformationToAdd.displayForAdminOnly = false;
    pilotInformationToAdd.subItems = new Array<NavBarItems.NavBarSubItems>();

    const pilotInformationMapAndLocationSubItem = new NavBarItems.NavBarSubItems();
    pilotInformationMapAndLocationSubItem.title = 'Map and Location';
    pilotInformationMapAndLocationSubItem.linkToNavigateTo = this.navigationRoutes.MapAndLocation;
    pilotInformationMapAndLocationSubItem.displayForAdminOnly = false;
    pilotInformationToAdd.subItems.push(pilotInformationMapAndLocationSubItem);

    const pilotInformationAirfieldInformationSubItem = new NavBarItems.NavBarSubItems();
    pilotInformationAirfieldInformationSubItem.title = 'Airfield Information';
    pilotInformationAirfieldInformationSubItem.linkToNavigateTo = this.navigationRoutes.AirfieldInformation;
    pilotInformationAirfieldInformationSubItem.displayForAdminOnly = false;
    pilotInformationToAdd.subItems.push(pilotInformationAirfieldInformationSubItem);

    const pilotInformationJoiningAndLandingSubItem = new NavBarItems.NavBarSubItems();
    pilotInformationJoiningAndLandingSubItem.title = 'Joining and Landing';
    pilotInformationJoiningAndLandingSubItem.linkToNavigateTo = this.navigationRoutes.JoiningAndLanding;
    pilotInformationJoiningAndLandingSubItem.displayForAdminOnly = false;
    pilotInformationToAdd.subItems.push(pilotInformationJoiningAndLandingSubItem);

    const pilotInformationReportingHazardsSubItem = new NavBarItems.NavBarSubItems();
    pilotInformationReportingHazardsSubItem.title = 'Reporting Hazards';
    pilotInformationReportingHazardsSubItem.linkToNavigateTo = this.navigationRoutes.ReportingHazards;
    pilotInformationReportingHazardsSubItem.displayForAdminOnly = false;
    pilotInformationToAdd.subItems.push(pilotInformationReportingHazardsSubItem);

    const pilotInformationRunwayInfoSubItem = new NavBarItems.NavBarSubItems();
    pilotInformationRunwayInfoSubItem.title = 'Runway Info';
    pilotInformationRunwayInfoSubItem.documentToOpen = this.documentsToDisplayEnum.RunwayInfo;
    pilotInformationRunwayInfoSubItem.displayForAdminOnly = false;
    pilotInformationToAdd.subItems.push(pilotInformationRunwayInfoSubItem);

    const pilotInformationParamotorPilotSubItem = new NavBarItems.NavBarSubItems();
    pilotInformationParamotorPilotSubItem.title = 'Paramotor Pilots';
    pilotInformationParamotorPilotSubItem.documentToOpen = this.documentsToDisplayEnum.ParamotorPilots;
    pilotInformationParamotorPilotSubItem.displayForAdminOnly = false;
    pilotInformationToAdd.subItems.push(pilotInformationParamotorPilotSubItem);

    this.navBarItems.push(pilotInformationToAdd);

    // FATA Merch
    const fataMerchItemToAdd = new NavBarItems.NavLink();
    fataMerchItemToAdd.title = 'FATA Merch';
    fataMerchItemToAdd.navLinkToCheck = '/merch';
    fataMerchItemToAdd.displayForAdminOnly = false;
    fataMerchItemToAdd.subItems = new Array<NavBarItems.NavBarSubItems>();

    const fataMerchClassifiedsSubItemToAdd = new NavBarItems.NavBarSubItems();
    fataMerchClassifiedsSubItemToAdd.title = 'Classifieds';
    fataMerchClassifiedsSubItemToAdd.linkToNavigateTo = this.navigationRoutes.Classifieds;
    fataMerchClassifiedsSubItemToAdd.displayForAdminOnly = false;
    fataMerchItemToAdd.subItems.push(fataMerchClassifiedsSubItemToAdd);

    this.navBarItems.push(fataMerchItemToAdd);

    // Home
    const galleryItemToAdd = new NavBarItems.NavLink();
    galleryItemToAdd.title = 'Gallery';
    galleryItemToAdd.navLinkToCheck = '/gallery';
    galleryItemToAdd.linkToNavigateTo = this.navigationRoutes.GalleryLanding;
    galleryItemToAdd.displayForAdminOnly = false;
    this.navBarItems.push(galleryItemToAdd);

    // Property for Sale and Rent
    const PropertyForSaleAndRentItemToAdd = new NavBarItems.NavLink();
    PropertyForSaleAndRentItemToAdd.title = 'Property for Sale and Rent';
    PropertyForSaleAndRentItemToAdd.navLinkToCheck = '/property-for-sale';
    PropertyForSaleAndRentItemToAdd.displayForAdminOnly = false;
    PropertyForSaleAndRentItemToAdd.subItems = new Array<NavBarItems.NavBarSubItems>();

    const propertyForSaleTedderfieldSalesBrochureSubItem = new NavBarItems.NavBarSubItems();
    propertyForSaleTedderfieldSalesBrochureSubItem.title = 'Tedderfield Sales Brochure';
    propertyForSaleTedderfieldSalesBrochureSubItem.documentToOpen = this.documentsToDisplayEnum.SalesBrochure;
    propertyForSaleTedderfieldSalesBrochureSubItem.displayForAdminOnly = false;
    PropertyForSaleAndRentItemToAdd.subItems.push(propertyForSaleTedderfieldSalesBrochureSubItem);

    const propertyForSaleHangerToRentBrochureSubItem = new NavBarItems.NavBarSubItems();
    propertyForSaleHangerToRentBrochureSubItem.title = 'Stands for Sale';
    propertyForSaleHangerToRentBrochureSubItem.linkToNavigateTo = this.navigationRoutes.StandsForSale;
    propertyForSaleHangerToRentBrochureSubItem.displayForAdminOnly = false;
    PropertyForSaleAndRentItemToAdd.subItems.push(propertyForSaleHangerToRentBrochureSubItem);

    const propertyForSaleHangersForSaleSubItem = new NavBarItems.NavBarSubItems();
    propertyForSaleHangersForSaleSubItem.title = 'Hangars for Sale';
    propertyForSaleHangersForSaleSubItem.linkToNavigateTo = this.navigationRoutes.HangarsForSale;
    propertyForSaleHangersForSaleSubItem.displayForAdminOnly = false;
    PropertyForSaleAndRentItemToAdd.subItems.push(propertyForSaleHangersForSaleSubItem);

    this.navBarItems.push(PropertyForSaleAndRentItemToAdd);

    // Members
    const membersItemToAdd = new NavBarItems.NavLink();
    membersItemToAdd.title = 'Members';
    membersItemToAdd.navLinkToCheck = '/members';
    membersItemToAdd.subItems = new Array<NavBarItems.NavBarSubItems>();

    const membersWelcomeSubItemToAdd = new NavBarItems.NavBarSubItems();
    membersWelcomeSubItemToAdd.title = 'Welcome';
    membersWelcomeSubItemToAdd.linkToNavigateTo = this.navigationRoutes.MembersWelcome;
    membersWelcomeSubItemToAdd.displayForLoggedOutUserOnly = true;
    membersItemToAdd.subItems.push(membersWelcomeSubItemToAdd);

    const membersFAQsSubItemToAdd = new NavBarItems.NavBarSubItems();
    membersFAQsSubItemToAdd.title = "FAQ's";
    membersFAQsSubItemToAdd.linkToNavigateTo = this.navigationRoutes.MembersFAQS;
    membersItemToAdd.subItems.push(membersFAQsSubItemToAdd);

    // const membersLogoutSubItemToAdd = new NavBarItems.NavBarSubItems();
    // membersLogoutSubItemToAdd.title = 'LOGOUT';
    // membersLogoutSubItemToAdd.linkToNavigateTo = this.navigationRoutes.MembersWelcome;
    // membersLogoutSubItemToAdd.displayForLoggedInUserOnly = true;
    // membersItemToAdd.subItems.push(membersLogoutSubItemToAdd);

    this.navBarItems.push(membersItemToAdd);










    // Admin
    const adminItemToAdd = new NavBarItems.NavLink();
    adminItemToAdd.title = 'Admin';
    adminItemToAdd.navLinkToCheck = '/admin';
    adminItemToAdd.displayForAdminOnly = true;
    adminItemToAdd.subItems = new Array<NavBarItems.NavBarSubItems>();

    const adminManageGallerySubItemToAdd = new NavBarItems.NavBarSubItems();
    adminManageGallerySubItemToAdd.title = 'Manage Gallery';
    adminManageGallerySubItemToAdd.linkToNavigateTo = this.navigationRoutes.GalleryAdmin;
    adminItemToAdd.subItems.push(adminManageGallerySubItemToAdd);

    this.navBarItems.push(adminItemToAdd);

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
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Runway Info', '../../../assets/documents/20241028-TedderfielfAirpark-RunwayInformation.pdf', null);
        break;
      case DocumentsToDisplayEnum.EmergencyContacts:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Emergency Contacts', '../../../assets/documents/20241014 -FATA Emergency Contacts - FATA -011.pdf', null);
        break;
      case DocumentsToDisplayEnum.SalesBrochure:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Tedderfield Sales Brochure', '../../../assets/documents/20240429-TedderfieldSalesBrochure.pdf', null);
        break;
      case DocumentsToDisplayEnum.ParamotorPilots:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Paramotor Pilots', '../../../assets/documents/20241028-Flying_the_Circuit_at_Tedderfield_Airpark-V4.pdf', null);
        break;
      case DocumentsToDisplayEnum.GroundOperations:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Ground Operations', '../../../assets/documents/20241028-TedderfieldAirpark-GroundOperations.pdf', null);
        break;
      case DocumentsToDisplayEnum.NOTAMSNewTab:
        AppHelperFunction.openDocumentInNewTab('https://www.b4flight.co.za/');
        break;
      case DocumentsToDisplayEnum.CircuitProcedures:
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Ground Operations', '../../../assets/documents/20241028-Flying_the_Circuit_at_Tedderfield_Airpark_MAP_ONLY-V4.pdf', null);
        break;
    }

  }
}
