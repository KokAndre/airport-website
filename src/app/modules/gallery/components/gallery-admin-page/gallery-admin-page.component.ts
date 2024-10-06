import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { SectionDataModel } from '../../models/section-data.model';

@Component({
  selector: 'app-gallery-admin-page',
  templateUrl: './gallery-admin-page.component.html',
  styleUrls: ['./gallery-admin-page.component.scss']
})
export class GalleryAdminPageComponent implements OnInit {

  // TODO: Remove mock data!!!!
  public galleryData: SectionDataModel.Section[] = [
    {
      sectionId: 1,
      title: 'Section - Peter',
      description: 'This is the description for section - Peter',
      isDarkSection: false,
      images: [
        {
          imageId: 1,
          imageName: 'Image 1',
          imagePath: 'assets/test-gallery-images/image1.jpeg'
        },
        {
          imageId: 2,
          imageName: 'Image 2',
          imagePath: 'assets/test-gallery-images/image2.jpeg'
        },
        {
          imageId: 3,
          imageName: 'Image 3',
          imagePath: 'assets/test-gallery-images/image3.jpeg'
        },
        // {
        //   imageId: 4,
        //   imageName: 'Image 4',
        //   imagePath: 'assets/test-gallery-images/image4.jpeg'
        // },
        // {
        //   imageId: 5,
        //   imageName: 'Image 5',
        //   imagePath: 'assets/test-gallery-images/image5.jpeg'
        // },
        // {
        //   imageId: 6,
        //   imageName: 'Image 6',
        //   imagePath: 'assets/test-gallery-images/image6.jpeg'
        // },
        // {
        //   imageId: 7,
        //   imageName: 'Image 7',
        //   imagePath: 'assets/test-gallery-images/image7.jpeg'
        // },
        // {
        //   imageId: 8,
        //   imageName: 'Image 8',
        //   imagePath: 'assets/test-gallery-images/image8.jpeg'
        // }
      ]
    },
    {
      sectionId: 2,
      title: 'Section - Stewie',
      description: 'This is the description for section - Stewie',
      isDarkSection: false,
      images: [
        {
          imageId: 9,
          imageName: 'Image 9',
          imagePath: 'assets/test-gallery-images/image9.jpeg'
        },
        {
          imageId: 10,
          imageName: 'Image 10',
          imagePath: 'assets/test-gallery-images/image10.jpeg'
        },
        {
          imageId: 11,
          imageName: 'Image 11',
          imagePath: 'assets/test-gallery-images/image11.jpeg'
        },
        {
          imageId: 12,
          imageName: 'Image 12',
          imagePath: 'assets/test-gallery-images/image12.jpeg'
        },
        {
          imageId: 13,
          imageName: 'Image 13',
          imagePath: 'assets/test-gallery-images/image13.jpeg'
        }
      ]
    },
    // {
    //   sectionId: 3,
    //   title: 'Section - Chris',
    //   description: 'This is the description for section - Chris',
    //   isDarkSection: false,
    //   images: [
    //     {
    //       imageId: 14,
    //       imageName: 'Image 14',
    //       imagePath: 'assets/test-gallery-images/image14.jpeg'
    //     },
    //     {
    //       imageId: 15,
    //       imageName: 'Image 15',
    //       imagePath: 'assets/test-gallery-images/image15.jpeg'
    //     },
    //     {
    //       imageId: 16,
    //       imageName: 'Image 16',
    //       imagePath: 'assets/test-gallery-images/image16.jpeg'
    //     },
    //     {
    //       imageId: 17,
    //       imageName: 'Image 17',
    //       imagePath: 'assets/test-gallery-images/image17.jpeg'
    //     },
    //     {
    //       imageId: 18,
    //       imageName: 'Image 18',
    //       imagePath: 'assets/test-gallery-images/image18.jpeg'
    //     },
    //     {
    //       imageId: 19,
    //       imageName: 'Image 19',
    //       imagePath: 'assets/test-gallery-images/image19.jpeg'
    //     }
    //   ]
    // }
  ]

  constructor(public router: Router, public appModalService: AppModalService) { }

  ngOnInit() {
  }

  public navigateToGalleryLandingPage() {
    this.router.navigateByUrl(AppRoutes.GalleryLanding);
  }

  public deleteSectionClicked(sectionClicked: SectionDataModel.Section) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Section', `Are you sure you want to delete the following section: </br> </br> <p class="mb-0 text-bold text-size-24">${sectionClicked.title}</p>`, null, this.deleteSectionModalOutcome.bind(this, sectionClicked));
  }

  public deleteSectionModalOutcome(section: SectionDataModel.Section, modalOutcome: string) {
    console.log('MODAL OUTCOME: ', modalOutcome);
    console.log('SECTION: ', section);

    if(modalOutcome === ModalOutcomeOptions.Confirm) {
      // TODO: Add service call to update this in the DB and remove hardcoding
      console.log('DELETE SECTION CONFIRMED!!!!');
      this.galleryData = this.galleryData.filter(x => x.sectionId !== section.sectionId);
    }
  }

  public editSectionHeadingClicked(sectionClicked: SectionDataModel.Section) {
    const modalData = new SectionDataModel.Section();
    modalData.sectionId = sectionClicked.sectionId;
    modalData.title = sectionClicked.title;
    modalData.description = sectionClicked.description;
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureGallerySectionTitle, 'Edit Section', '', modalData, this.editSectionHeadingModalOutcome.bind(this));
  }

  public editSectionHeadingModalOutcome(modalOutcome: string, section?: SectionDataModel.Section) {
    console.log('MODAL OUTCOME: ', modalOutcome);
    console.log('SECTION: ', section);

    if(modalOutcome === ModalOutcomeOptions.Update) {
      // TODO: Add service call to update this in the DB and remove hardcoding
      console.log('UPDATE SECTION: ', section);
      this.galleryData.map(sec => {
        if (sec.sectionId === section?.sectionId) {
          sec.title = section.title;
          sec.description = section.description;

          // Close the modal after the update is done
          this.appModalService.CloseModal();
        }
      });
    }
  }

  public deleteImageClicked(sectionId: number, imageId: number) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Image', `Are you sure you want to delete the image`, null, this.deleteImageModalOutcome.bind(this, imageId, sectionId));
  }

  public deleteImageModalOutcome(imageId: number, sectionId: number, modalOutcome: string) {
    if(modalOutcome === ModalOutcomeOptions.Confirm) {
      // TODO: Add service call to update this in the DB and remove hardcoding
      this.galleryData.map(sec => {
        if (sec.sectionId === sectionId) {
          sec.images = sec.images.filter(img => img.imageId !== imageId);
        }
      });
    }
  }

  public addSectionCLicked() {
    const newSectionToAdd = new SectionDataModel.Section();
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureGallerySectionTitle, 'Edit Section', '', newSectionToAdd, this.createSectionModalOutcone.bind(this));
  }

  public createSectionModalOutcone(modalOutcome: string, section?: SectionDataModel.Section) {
    console.log('MODAL OUTCOME: ', modalOutcome);
    console.log('SECTION: ', section);

    if(modalOutcome === ModalOutcomeOptions.Update && section) {
      // TODO: Add service call to update this in the DB and remove hardcoding
      console.log('UPDATE SECTION: ', section);
      this.galleryData.push(section);
      
      // Close the modal after the update is done
      this.appModalService.CloseModal();
    }
  }

}
