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

  // TODO: Remove mock data!!!!
  // public galleryData: GetGalleryDataResponse.Section[] = [
  //   {
  //     sectionId: 1,
  //     title: 'Section - Peter',
  //     description: 'This is the description for section - Peter',
  //     isDarkSection: false,
  //     images: [
  //       {
  //         imageId: 1,
  //         imageName: 'Image 1',
  //         imagePath: 'assets/test-gallery-images/image1.jpeg'
  //       },
  //       {
  //         imageId: 2,
  //         imageName: 'Image 2',
  //         imagePath: 'assets/test-gallery-images/image2.jpeg'
  //       },
  //       {
  //         imageId: 3,
  //         imageName: 'Image 3',
  //         imagePath: 'assets/test-gallery-images/image3.jpeg'
  //       },
  //       // {
  //       //   imageId: 4,
  //       //   imageName: 'Image 4',
  //       //   imagePath: 'assets/test-gallery-images/image4.jpeg'
  //       // },
  //       // {
  //       //   imageId: 5,
  //       //   imageName: 'Image 5',
  //       //   imagePath: 'assets/test-gallery-images/image5.jpeg'
  //       // },
  //       // {
  //       //   imageId: 6,
  //       //   imageName: 'Image 6',
  //       //   imagePath: 'assets/test-gallery-images/image6.jpeg'
  //       // },
  //       // {
  //       //   imageId: 7,
  //       //   imageName: 'Image 7',
  //       //   imagePath: 'assets/test-gallery-images/image7.jpeg'
  //       // },
  //       // {
  //       //   imageId: 8,
  //       //   imageName: 'Image 8',
  //       //   imagePath: 'assets/test-gallery-images/image8.jpeg'
  //       // }
  //     ]
  //   },
  //   {
  //     sectionId: 2,
  //     title: 'Section - Stewie',
  //     description: 'This is the description for section - Stewie',
  //     isDarkSection: false,
  //     images: [
  //       {
  //         imageId: 9,
  //         imageName: 'Image 9',
  //         imagePath: 'assets/test-gallery-images/image9.jpeg'
  //       },
  //       {
  //         imageId: 10,
  //         imageName: 'Image 10',
  //         imagePath: 'assets/test-gallery-images/image10.jpeg'
  //       },
  //       {
  //         imageId: 11,
  //         imageName: 'Image 11',
  //         imagePath: 'assets/test-gallery-images/image11.jpeg'
  //       },
  //       {
  //         imageId: 12,
  //         imageName: 'Image 12',
  //         imagePath: 'assets/test-gallery-images/image12.jpeg'
  //       },
  //       {
  //         imageId: 13,
  //         imageName: 'Image 13',
  //         imagePath: 'assets/test-gallery-images/image13.jpeg'
  //       }
  //     ]
  //   },
  //   // {
  //   //   sectionId: 3,
  //   //   title: 'Section - Chris',
  //   //   description: 'This is the description for section - Chris',
  //   //   isDarkSection: false,
  //   //   images: [
  //   //     {
  //   //       imageId: 14,
  //   //       imageName: 'Image 14',
  //   //       imagePath: 'assets/test-gallery-images/image14.jpeg'
  //   //     },
  //   //     {
  //   //       imageId: 15,
  //   //       imageName: 'Image 15',
  //   //       imagePath: 'assets/test-gallery-images/image15.jpeg'
  //   //     },
  //   //     {
  //   //       imageId: 16,
  //   //       imageName: 'Image 16',
  //   //       imagePath: 'assets/test-gallery-images/image16.jpeg'
  //   //     },
  //   //     {
  //   //       imageId: 17,
  //   //       imageName: 'Image 17',
  //   //       imagePath: 'assets/test-gallery-images/image17.jpeg'
  //   //     },
  //   //     {
  //   //       imageId: 18,
  //   //       imageName: 'Image 18',
  //   //       imagePath: 'assets/test-gallery-images/image18.jpeg'
  //   //     },
  //   //     {
  //   //       imageId: 19,
  //   //       imageName: 'Image 19',
  //   //       imagePath: 'assets/test-gallery-images/image19.jpeg'
  //   //     }
  //   //   ]
  //   // }
  // ]

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
    this.adminService. getGalleryData().then((results: GetGalleryDataResponse.RootObject) => {
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
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', results.message, null);
          this.getGalleryData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', results.message, null);
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

  public uploadImage(section: GetGalleryDataResponse.Section, imageData: UploadImageRequest.RootObject) {
    if (!section?.id || !imageData) {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Error uploading image', 'No section ID is present in request. Please contact administrator', null);
    } else {
      this.adminService.uploadNewImage(section.id, imageData.imageData, imageData.imageName).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', results.message, null);
          this.getGalleryData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Image', results.message, null);
        }
      });
    }
  }

}
