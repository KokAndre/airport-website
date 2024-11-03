import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Endpoints, ModalTypes } from 'src/app/enums/app.enums';
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
  public bannerFullUrl = '';

  constructor(public loginService: LoginService, public modalService: AppModalService, public http: HttpClient, public sanitizer: DomSanitizer) {
    this.getHomePageBanner();
  }

  ngOnInit() {
  }

  public getHomePageBanner() {
    this.loginService.getHomePageBanner().then((results: GetHomePageBannerResponse.RootObject) => {
      if (results.status === 200 && results.documentData) {
        const urlForModal = 'data:application/pdf;base64,' + results.documentData.file;
        this.modalService.ShowConfirmationModal(ModalTypes.PDFModal, results.documentData.name, urlForModal, null);
      } else {
        this.bannerFullUrl = '';
      }
    });
  }

}
