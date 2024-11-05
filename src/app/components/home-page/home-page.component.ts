import { Component, OnInit } from '@angular/core';
import { ModalTypes, SessionStorageKeys } from 'src/app/enums/app.enums';
import { SessionStorageHelper } from 'src/app/helpers/app-helper.functions';
import { GetHomePageBannerResponse } from 'src/app/models/get-home-page-banner-response.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public backgroundVideo: any;

  constructor(public loginService: LoginService, public modalService: AppModalService) {
    const hasViewedBannerItem = SessionStorageHelper.getItem(SessionStorageKeys.HasViewedBanner);

    if (!hasViewedBannerItem) {
      this.getHomePageBanner();
    }
  }

  ngOnInit() {
  }

  public getHomePageBanner() {
    this.loginService.getHomePageBanner().then((results: GetHomePageBannerResponse.RootObject) => {
      if (results.status === 200 && results.documentData) {
        const urlForModal = 'data:application/pdf;base64,' + results.documentData.file;
        this.modalService.ShowConfirmationModal(ModalTypes.PDFModal, results.documentData.name, urlForModal, null);
        SessionStorageHelper.storeItem(SessionStorageKeys.HasViewedBanner, 'true');
      }
    });
  }

}
