import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppRoutes, ModalTypes, SessionStorageKeys } from 'src/app/enums/app.enums';
import { ModalDetails } from 'src/app/models/app-modal.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AppModalComponent } from '../app-modal/app-modal.component';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import * as moment from 'moment';
import { SessionStorageHelper } from 'src/app/helpers/app-helper.functions';
import { GetHomePageBannerResponse } from 'src/app/models/get-home-page-banner-response.model';

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
  private resizeObserver: ResizeObserver;
  public isMobileView = false;
  public isFooterMobileView = false;
  public displayFooterButtonBottomMargin = false;
  public displaySocialMediaLogoBottomMargin = false;
  public hasViewedBanner = false;

  constructor(public router: Router,
    public loginService: LoginService,
    public appModalService: AppModalService,
    private modalDialog: MatDialog,
    private gtmService: GoogleTagManagerService) {
  }

  ngOnInit() {
    this.initializeIsLoggedInCheck();
    this.initializeModal();
    this.initializeScreenSizeCheck();

    if (this.router.url?.includes('home')) {
      this.getHomePageBanner();
    }

    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'navigate',
          isLoggedIn: this.isAuthorised,
          name: this.isAuthorised ? this.loginService.isAuthorised(true) : '',
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
    this.loginService.logoutUser();

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
      this.isAuthorised = this.loginService.isAuthorised();
      this.hasCompletedGettingToKnowYou = this.loginService.checkIfUserHasCompletedGettingToKnowYou();
      if (this.isAuthorised) {
        this.isUserAdmin = this.loginService.isLogedInUserAdmin();
      } else {
        this.isUserAdmin = false;
      }
    }, 1000);
  }

  public logout() {
    this.loginService.logoutUser();
  }

  public getLoggedInUsername() {
    return this.loginService.getLoggedInUsername();
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
        case ModalTypes.ConfirmationModal:
        case ModalTypes.CaptureGallerySectionTitle:
        case ModalTypes.SearchAndSecueModal:
        case ModalTypes.InterestedInPropertyModal:
        case ModalTypes.AddFolderModal:
          this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
            data: modalDetails, disableClose: false, maxWidth: '90vw', panelClass: 'min-width-modal-class'
          });
          break;

        // this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
        //   data: modalDetails, disableClose: true, maxWidth
        // });
        // break;

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
        if (results.status === 200 && results.documentData) {
          const urlForModal = 'data:application/pdf;base64,' + results.documentData.file;
          this.appModalService.ShowConfirmationModal(ModalTypes.BannerModal, results.documentData.name, urlForModal, null);
          this.hasViewedBanner = true;
        }
      });
    }

  }

  public displayTermsAndConditions() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Terms and Conditions ', '../../../assets/documents/20240801-FATA_Websites_Terms_and_Conditions.pdf', null);
  }

  public displayPrivacyPolicy() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Privacy Policy', '../../../assets/documents/20240801-FATA_Privacy_Policy.pdf', null);
  }

  public openSearchAndRescue() {
    this.appModalService.ShowConfirmationModal(ModalTypes.SearchAndSecueModal, 'Search and Rescue', '', null);
  }

  public navigateToLiveWeather() {
    this.router.navigateByUrl(AppRoutes.LiveWeather);
  }

}
