import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Endpoints, ModalTypes } from 'src/app/enums/app.enums';
import { GetGalleryDataResponse } from 'src/app/models/get-gallery-data-response.model';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-gallery-landing',
  templateUrl: './gallery-landing.component.html',
  styleUrls: ['./gallery-landing.component.scss']
})
export class GalleryLandingComponent implements OnInit {
  public galleryData = new Array<GetGalleryDataResponse.Section>;

  constructor(public router: Router, private adminService: AdminService, private appModalService: AppModalService) { }

  ngOnInit() {
    this.adminService.getGalleryData().then((results: GetGalleryDataResponse.RootObject) => {
      if (results.status === 200) {
        this.galleryData = results.sections;
        this.galleryData.forEach(section => {
          section.isExpanded = true;
          section.images?.forEach(image => {
            image.imageSource = Endpoints.GalleryImagesBaseURL + image.name;
          });
        });
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Gallery Data', results.message, null);
      }
    });
  }

  public getGalleryData() {
    this.adminService.getGalleryData()
  }

  public navigateToEditGalleryPage() {
    this.router.navigateByUrl(AppRoutes.GalleryAdmin);
  }

  public togglePannel(indexToToggle: number) {
      this.galleryData[indexToToggle].isExpanded = !this.galleryData[indexToToggle].isExpanded;
  }

}
