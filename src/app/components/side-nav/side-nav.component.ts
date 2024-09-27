import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { ModalDetails } from 'src/app/models/app-modal.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AppModalComponent } from '../app-modal/app-modal.component';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import * as moment from 'moment';

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

  constructor(public router: Router,
    public loginService: LoginService,
    public appModalService: AppModalService,
    private modalDialog: MatDialog,
    private gtmService: GoogleTagManagerService) { }

  ngOnInit() {
    this.initializeIsLoggedInCheck();
    this.initializeModal();

    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'navigate',
          isLoggedIn: this.isAuthorised,
          name: this.isAuthorised ? this.loginService.isAuthorised(true) : '',
          url: item.url,
          dateTime: moment(new Date()).format('YYYY-MM-DD - HH:mm:ss:SSS')
        };
        console.log('GTM TAG', gtmTag);
        this.gtmService.pushTag(gtmTag);
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
      // console.log('IS AUTH: ', this.isAuthorised);
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
      if (modalDetails === null) {
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
            data: modalDetails, disableClose: false, height: '99%', width: '100%', panelClass: 'full-width-dialog'
          });
          break;

        case ModalTypes.InformationModal:
          this.dialogRefModel = this.modalDialog.open(AppModalComponent, {
            data: modalDetails, disableClose: false, minWidth: '400px'
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

  public displayTermsAndConditions() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Website Terms and Conditions  ', 'assets/documents/FATA-Websites-Terms-and-Conditions.pdf', null);
  }

  public navigateToLiveWeather() {
    this.router.navigateByUrl(AppRoutes.LiveWeather);
  }

}
