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
  public modal$: Subscription;
  public dialogRefModel: any = null;
  public isUserAdmin = false;
  private resizeObserver: ResizeObserver;
  public isMobileView = false;
  public isFooterMobileView = false;

  constructor(public router: Router,
    public loginService: LoginService,
    public appModalService: AppModalService,
    private modalDialog: MatDialog,
    private gtmService: GoogleTagManagerService) {
      console.log('IN cont!!!!!');
      SessionStorageHelper.removeItem(SessionStorageKeys.HasViewedBanner);
    }

  ngOnInit() {
    this.initializeIsLoggedInCheck();
    this.initializeModal();
    this.initializeScreenSizeCheck();

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
      }
    });
  }

  ngOnDestroy(): void {
    this.checkIsAuthInterval = null;
    this.loginService.logoutUser();

    console.log('IN DESTROY!!!!!');
    SessionStorageHelper.removeItem(SessionStorageKeys.HasViewedBanner);

    if (this.modal$) {
      this.modal$.unsubscribe();
    }
  }

  public navigateToRoute(newRoute: string) {
    this.router.navigateByUrl(newRoute);
  }

  public setHeaderColour(event: any) {
    // console.log('Scroll Event: ', event.srcElement.scrollTop);

    if (event?.srcElement?.scrollTop > 10) {
      this.displayHeaderAsSolid = true;
    } else {
      this.displayHeaderAsSolid = false;
    }
  }

  public initializeIsLoggedInCheck() {
    this.checkIsAuthInterval = setInterval(() => {
      this.isAuthorised = this.loginService.isAuthorised();
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
      console.log('MODAL DETAILS IN SIDE NAV SUBSCRIPTION: ', modalDetails);
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
          this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
            data: modalDetails, disableClose: false, height: 'fit-content', panelClass: 'pdf-modal-class', maxWidth: '90vw'
          });
          break;

        case ModalTypes.InformationModal:
        case ModalTypes.ConfirmationModal:
        case ModalTypes.CaptureGallerySectionTitle:
        case ModalTypes.SearchAndSecueModal: 
          this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
            data: modalDetails, disableClose: false, minWidth: '400px', maxWidth: '90vw'
          });
          break;

        // case ModalTypes.ConfirmationModal:
        //   this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
        //     data: modalDetails, disableClose: false, minWidth: '400px'
        //   });
        //   break;

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

      if (widthToCheck < 400) {
        this.isFooterMobileView = true;
      } else {
        this.isFooterMobileView = false;
      }
    });

    // Add a listener to body
    this.resizeObserver.observe(body);
  }

  public displayTermsAndConditions() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Terms and Conditions ', '../../../assets/documents/FATA-Websites-Terms-and-Conditions.pdf', null);
  }

  public displayPrivacyPolicy() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Privacy Policy', '../../../assets/documents/20240801-FATA-Privacy-Policy.pdf', null);
  }

  public openSearchAndRescue() {
    this.appModalService.ShowConfirmationModal(ModalTypes.SearchAndSecueModal, 'Search and Rescue', '', null);
  }

  public navigateToLiveWeather() {
    this.router.navigateByUrl(AppRoutes.LiveWeather);
  }

}
