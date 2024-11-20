import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { GetHomePageBannerResponse } from 'src/app/models/get-home-page-banner-response.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { AddHomePageBannerRequest } from 'src/app/models/add-home-page-banner-request.model';

@Component({
  selector: 'app-manage-home-screen-banner',
  templateUrl: './manage-home-screen-banner.component.html',
  styleUrls: ['./manage-home-screen-banner.component.scss']
})
export class ManageHomeScreenBannerComponent implements OnInit {
  public currentDocumentData: GetHomePageBannerResponse.DocumentData;
  @ViewChild('fileUploader', { static: true }) fileUploader: ElementRef;

  constructor(private adminService: AdminService, public appModalService: AppModalService) {
    this.getHomePageBanner();
  }

  ngOnInit() {
  }

  public getHomePageBanner() {
    this.adminService.getHomePageBanner().then((results: GetHomePageBannerResponse.RootObject) => {
      if (results.status === 200 && results.documentData) {
        this.currentDocumentData = new GetHomePageBannerResponse.DocumentData;
        if (results.documentData.name && results.documentData.file) {
          this.currentDocumentData.name = results.documentData.name;
          this.currentDocumentData.file = 'data:application/pdf;base64,' + results.documentData.file;
        }
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, results.header, results.message, null);
      }
    });
  }

  public deleteBannerClicked() {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Banner', 'Are you sure you want to delete the home screen banner?', null, this.deleteBannerModalOutcome.bind(this))
  }

  private deleteBannerModalOutcome(modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteHomeScreenBanner().then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Banner', results.message, null);
          this.getHomePageBanner();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Banner', results.message, null);
        }
      });
    }
  }

  public addDocumentClicked() {
    this.fileUploader.nativeElement.click();
  }

  public uploadFile(event: any) {
    let status = false;
    const file = event.target.files[0];
    status = event.target.files.length > 0 ? true : false;

    if (status == true) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const documentSrc = reader.result || '';
        // const dataToUpload = new AddHomePageBannerRequest.RootObject();
        // dataToUpload.fileName = file.name;

        // if (file.size > 500000) {
        //   const imageToCompress = {
        //     image: documentSrc as string,
        //     orientation: 1,
        //     fileName: file.name
        //   }
        //   this.imageCompress
        //     .getImageWithMaxSizeAndMetas(imageToCompress, 0.5) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
        //     .then(
        //       (result) => {
        //         dataToEmit.imageData = result.image;
        //         this.imageUploadedEmit.emit(dataToEmit);
        //       },
        //       (result: string) => {
        //         this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload image', 'The file size was too big. Please try uploading a smaller file.', null);
        //       }
        //     );
        // } else {
          // dataToUpload.fileData = documentSrc;
          this.addNewBanner(file.name, documentSrc);
        // }
      }
    } else {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Error uploading file', 'No file was selected.', null);
    }
  }

  public addNewBanner(documentName: string, documentData: any) {
    this.adminService.addHomeScreenBanner(documentName, documentData).then(results => {
      if (results.status === 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Add Banner', results.message, null);
        this.getHomePageBanner();
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Add Banner', results.message, null);
      }
    });
  }

}
