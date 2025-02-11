import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, Endpoints, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { UploadImageRequest } from 'src/app/models/upload-image-request.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { AdminService } from '../../services/admin.service';
import { GetGalleryDataResponse } from 'src/app/models/get-gallery-data-response.model';

@Component({
  selector: 'app-gallery-admin-page',
  templateUrl: './gallery-admin-page.component.html',
  styleUrls: ['./gallery-admin-page.component.scss']
})
export class GalleryAdminPageComponent implements OnInit {
  public galleryData = new Array<GetGalleryDataResponse.Section>;

  constructor(public router: Router,
    public appModalService: AppModalService,
    public adminService: AdminService
  ) { }

  ngOnInit() {
    this.getGalleryData();
  }

  public navigateToGalleryLandingPage() {
    this.router.navigateByUrl(AppRoutes.GalleryLanding);
  }

  public getGalleryData() {
    this.adminService.getGalleryData().then((results: GetGalleryDataResponse.RootObject) => {
      if (results.status === 200) {
        this.galleryData = results.sections;
        this.galleryData.forEach(section => {
          section.images?.forEach(image => {
            image.imageSource = Endpoints.GalleryImagesBaseURL + image.name;
          });
        });
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Gallery Data', results.message, null);
      }
    });
  }

  public deleteSectionClicked(sectionId: string, sectionTitle: string) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Section', `Are you sure you want to delete the following section: </br> </br> <p class="mb-0 text-bold text-size-24">${sectionTitle}</p>`, null, this.deleteSectionModalOutcome.bind(this, sectionId));
  }

  public deleteSectionModalOutcome(sectionId: string, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteSection(sectionId).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', results.message, null);
          this.getGalleryData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', results.message, null);
        }
      });
    }
  }

  public editSectionHeadingClicked(sectionClicked: GetGalleryDataResponse.Section) {
    const modalData = new GetGalleryDataResponse.Section();
    modalData.id = sectionClicked.id;
    modalData.title = sectionClicked.title;
    modalData.description = sectionClicked.description;
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureGallerySectionTitle, 'Edit Section', '', modalData, this.editSectionHeadingModalOutcome.bind(this));
  }

  public editSectionHeadingModalOutcome(modalOutcome: string, section?: GetGalleryDataResponse.Section) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.adminService.editSection(section?.id || '', section?.title || '', section?.description || '').then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', results.message, null);
          this.getGalleryData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', results.message, null);
        }
      });
    }
  }

  public deleteImageClicked(imageName: string, imageId: string) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Image', `Are you sure you want to delete the image`, null, this.deleteImageModalOutcome.bind(this, imageId, imageName));
  }

  public deleteImageModalOutcome(imageId: string, imageName: string, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteImage(imageId, imageName).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Image', results.message, null);
          this.getGalleryData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Image', results.message, null);
        }
      });
    }
  }

  public addSectionCLicked() {
    const newSectionToAdd = new GetGalleryDataResponse.Section();
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureGallerySectionTitle, 'Add Section', '', newSectionToAdd, this.createSectionModalOutcone.bind(this));
  }

  public createSectionModalOutcone(modalOutcome: string, section?: GetGalleryDataResponse.Section) {
    if (modalOutcome === ModalOutcomeOptions.Update && section) {
      if (!section.title) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Error uploading image', 'No section data was provided.', null);
      } else {
        this.adminService.createSection(section.title, section.description).then(results => {
          if (results.status === 200) {
            this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Create Section', results.message, null);
            this.getGalleryData();
          } else {
            this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Create Section', results.message, null);
          }
        });
      }
    }
  }

  public async uploadImage(section: GetGalleryDataResponse.Section, imageDataArray: UploadImageRequest.FileData[]) {
    if (!section?.id || !imageDataArray?.length) {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Error uploading image', 'No section ID is present in request. Please contact administrator', null);
    } else {
      let isAllImagesUploaded = true;
      let errorMessage = '';

      const currentImageLength = section.images?.length || 0;

      if (currentImageLength < 24) {

        const numOfImagesLeft = 24 - currentImageLength;

        if (imageDataArray.length > numOfImagesLeft) {
          imageDataArray = imageDataArray.splice(0, numOfImagesLeft);
        }

        for (let index = 0; index < imageDataArray.length; index++) {
          const imageFile = imageDataArray[index];
          await this.adminService.uploadNewImageAsFile(section.id, imageFile.imageData).then(results => {
            if (results.status !== 200) {
              isAllImagesUploaded = false;
              if (results.status === 403) {
                if (!errorMessage) {
                  errorMessage = results.message + `<br> <br> ${imageFile.imageName}`;
                } else {
                  errorMessage += `<br> <br> ${imageFile.imageName}`;
                }
              }
            }

            if (index === imageDataArray.length - 1) {
              if (isAllImagesUploaded) {
                this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', 'All images uploaded successfully.', null);
              } else {
                this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', errorMessage ? errorMessage : 'There was an issue uploading all of the images.', null);
              }
              this.getGalleryData();
            }

          });
        }
      }
    }
  }

}
