import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppRoutes, ModalTypes, SessionStorageKeys, UserDataInTokenToReturn } from 'src/app/enums/app.enums';
import { ModalDetails } from 'src/app/models/app-modal.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AppModalComponent } from '../app-modal/app-modal.component';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import * as moment from 'moment';
import { SessionStorageHelper } from 'src/app/helpers/app-helper.functions';
import { GetHomePageBannerResponse } from 'src/app/models/get-home-page-banner-response.model';
import { TokenService } from 'src/app/services/token/token.service';

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
  public hasCompletedGettingToKnowYou = false;
  public modal$: Subscription;
  public dialogRefModel: any = null;
  public isUserAdmin = false;
  public isSuperAdmin = false;
  private resizeObserver: ResizeObserver;
  public isMobileView = false;
  public isFooterMobileView = false;
  public displayFooterButtonBottomMargin = false;
  public displaySocialMediaLogoBottomMargin = false;
  public hasViewedBanner = false;
  public displayGettingToKnowYouBanner = false;
  public hasDismissedGettingToKnowYou = false;
  public isAllowedToViewWebsiteTickets = false;

  constructor(public router: Router,
    public loginService: LoginService,
    public appModalService: AppModalService,
    private modalDialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    public tokenService: TokenService) {
  }

  ngOnInit() {
    this.initializeIsLoggedInCheck();
    this.initializeModal();
    this.initializeScreenSizeCheck();

    if (this.router.url?.includes('/home')) {
      this.getHomePageBanner();
    }

    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'navigate',
          isLoggedIn: this.isAuthorised,
          name: this.isAuthorised ? this.tokenService.getUserData(UserDataInTokenToReturn.Name) : '',
          url: item.url,
          dateTime: moment(new Date()).format('YYYY-MM-DD - HH:mm:ss:SSS')
        };
        this.gtmService.pushTag(gtmTag);

        // Always scroll every page to the top
        document.getElementById('content-container').scroll({
          top: 0,
          left: 0,
          behavior: 'auto'
        });

        if (this.router.url?.includes('home')) {
          this.getHomePageBanner();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.checkIsAuthInterval = null;
    this.tokenService.logoutUser();

    if (this.modal$) {
      this.modal$.unsubscribe();
    }
  }

  public navigateToRoute(newRoute: string) {
    this.router.navigateByUrl(newRoute);
  }

  public setHeaderColour(event: any) {

    if (event?.srcElement?.scrollTop > 10) {
      this.displayHeaderAsSolid = true;
    } else {
      this.displayHeaderAsSolid = false;
    }
  }

  public initializeIsLoggedInCheck() {
    this.checkIsAuthInterval = setInterval(() => {
      this.isAuthorised = this.tokenService.isLoggedIn();
      this.hasCompletedGettingToKnowYou = this.tokenService.getUserData(UserDataInTokenToReturn.HasCompletedGettingToKnowYou) as boolean;

      if (this.isAuthorised) {
        this.isUserAdmin = this.tokenService.getUserData(UserDataInTokenToReturn.isAdmin) as boolean;

        if (this.isUserAdmin) {
          // Check For Super Admin
          this.isSuperAdmin = this.tokenService.getUserData(UserDataInTokenToReturn.IsSuperAdmin) as boolean;

          // Allow all super admin, and Chantal to see the website tickets
          const userEmail = this.tokenService.getUserData(UserDataInTokenToReturn.Email);
          if (this.isSuperAdmin || userEmail === 'grounds@tedderfield.co.za') {
            this.isAllowedToViewWebsiteTickets = true;
          } else {
            this.isAllowedToViewWebsiteTickets = false;
          }

        } else {
          this.isSuperAdmin = false;
          this.isAllowedToViewWebsiteTickets = false;
        }

        // const userDetails = this.tokenService.getUserData();
        // if (userDetails?.email === 'nic.rfp@gmail.com' || userDetails?.email === 'andre.kok97@outlook.com' || userDetails?.email === 'cathy@zapco.co.za') {
        //   this.isSuperAdmin = true;
        // } else {
        //   this.isSuperAdmin = false;
        // }

        if (!this.hasCompletedGettingToKnowYou && !this.hasDismissedGettingToKnowYou) {
          this.displayGettingToKnowYouBanner = true;
        } else {
          this.displayGettingToKnowYouBanner = false;
        }
      } else {
        this.isUserAdmin = false;
        this.isSuperAdmin = false;
        this.displayGettingToKnowYouBanner = false;
        this.isAllowedToViewWebsiteTickets = false;
      }
    }, 1000);

  }

  public navigateToGettingToKnowYou() {
    this.hasDismissedGettingToKnowYou = true;
    this.displayGettingToKnowYouBanner = false;
    this.router.navigateByUrl(AppRoutes.GettingToKnowYou);
  }

  public navigateToWelcomeScreen() {
    this.router.navigateByUrl(AppRoutes.MembersWelcome);
  }

  public goToManageProfile() {
    this.router.navigateByUrl(AppRoutes.ManageProfile);
  }

  public logout() {
    this.tokenService.logoutUser();
  }

  public getLoggedInUsername() {
    return this.tokenService.getUserData(UserDataInTokenToReturn.Name);
  }

  public initializeModal() {
    this.modal$ = this.appModalService.onEmmitModal.subscribe((modalDetails: ModalDetails) => {
      if (!modalDetails) {
        this.modalDialog.closeAll();
        return;
      }

      const retData = modalDetails;

      // Close the current mddal before a new one can be opened
      this.modalDialog.closeAll();
      this.dialogRefModel = null;

      switch (modalDetails.type) {
        case ModalTypes.PDFModal:
        case ModalTypes.BannerModal:
          this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
            data: modalDetails, disableClose: false, height: 'fit-content', panelClass: 'pdf-modal-class', maxWidth: '91vw'
          });
          break;

        case ModalTypes.InformationModal:
          this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
            data: modalDetails, disableClose: false, maxWidth: '90vw', panelClass: 'min-width-modal-class'
          });

          // Close information modals after 3 seconds
          setTimeout(() => {
            this.modalDialog.closeAll();
          }, 1500);
          break;

        case ModalTypes.ConfirmationModal:
        case ModalTypes.CaptureGallerySectionTitle:
        case ModalTypes.SearchAndSecueModal:
        case ModalTypes.InterestedInPropertyModal:
        case ModalTypes.AddFolderModal:
          this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
            data: modalDetails, disableClose: false, maxWidth: '90vw', panelClass: 'min-width-modal-class'
          });
          break;

        case ModalTypes.EditReportIssueData:
        case ModalTypes.CaptureMember:
        case ModalTypes.CapturSingleInputField:
        case ModalTypes.CapturePriorityData:
        case ModalTypes.CaptureWebTicketData:
        case ModalTypes.CaptureYoutubeVideo:
        case ModalTypes.CaptureEmailConfigItem:
        case ModalTypes.CaptureGettingToKnowYouData:
          this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
            data: modalDetails, disableClose: true, maxWidth: '90vw', panelClass: 'min-width-modal-class-medium'
          });
          break;

        default:
          this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
            data: modalDetails,
          });
          break;
      }


      if (this.dialogRefModel !== null) {
        this.dialogRefModel.afterClosed().subscribe(result => {
          modalDetails.callbackMessageResult(result, retData);
          this.dialogRefModel = null;
        });
      }
      // }
    });
  }

  public initializeScreenSizeCheck() {
    const body = document.getElementsByTagName("body")[0];
    this.resizeObserver = new ResizeObserver(() => {
      const widthToCheck = window.innerWidth;
      if (widthToCheck < 1126) {
        this.isMobileView = true;
      } else {
        this.isMobileView = false;
      }

      if (widthToCheck < 748) {
        this.displayFooterButtonBottomMargin = true;
      } else {
        this.displayFooterButtonBottomMargin = false;
      }


      if (widthToCheck < 377) {
        this.displaySocialMediaLogoBottomMargin = true;
      } else {
        this.displaySocialMediaLogoBottomMargin = false;
      }

      if (widthToCheck < 465) {
        this.isFooterMobileView = true;
      } else {
        this.isFooterMobileView = false;
      }
    });

    // Add a listener to body
    this.resizeObserver.observe(body);
  }

  public getHomePageBanner() {
    if (!this.hasViewedBanner) {
      this.loginService.getHomePageBanner().then((results: GetHomePageBannerResponse.RootObject) => {
        if (results.status === 200 && results.documentData?.file && results.documentData?.name) {
          const urlForModal = 'data:application/pdf;base64,' + results.documentData.file;
          this.appModalService.ShowConfirmationModal(ModalTypes.BannerModal, results.documentData.name, urlForModal, null);
          this.hasViewedBanner = true;
        }
      });
    }

  }

  public displayTermsAndConditions() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Terms and Conditions ', '../../../assets/documents/20240801 - FATA Websites Terms and Conditions.pdf', null);
  }

  public displayPrivacyPolicy() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Privacy Policy', '../../../assets/documents/20241205 - FATA Privacy Policy.pdf', null);
  }

  public openSearchAndRescue() {
    this.appModalService.ShowConfirmationModal(ModalTypes.SearchAndSecueModal, 'Search and Rescue', '', null);
  }

  public navigateToLiveWeather() {
    this.router.navigateByUrl(AppRoutes.LiveWeather);
  }

}
