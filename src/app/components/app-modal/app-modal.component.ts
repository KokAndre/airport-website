import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { ModalDetails } from 'src/app/models/app-modal.model';
import { SectionDataModel } from 'src/app/modules/gallery/models/section-data.model';

@Component({
  selector: 'app-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements OnInit {
  public isLoading = true;
  public modalTypesEnum = ModalTypes;
  public modalOutcomeOptions = ModalOutcomeOptions;
  public gallerySectionToEditData: SectionDataModel.Section;

  // @ViewChild(PdfViewerComponent, { static: false })
  // private pdfComponent: PdfViewerComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalDetails,) { }

  ngOnInit() {
    this.initializeModalData()
  }

  public initializeModalData() {
    switch (this.data.type) {
      case ModalTypes.CaptureGallerySectionTitle:
        if (this.data.inputValues) {
          this.gallerySectionToEditData = this.data.inputValues;
        } else {
          this.gallerySectionToEditData = new SectionDataModel.Section;
          this.gallerySectionToEditData.images = new Array<SectionDataModel.Image>;
        }

        console.log('VALUES IN MODAL: ', this.gallerySectionToEditData);
        this.isLoading = false;
        break;
    
      default:
        this.isLoading = false;
        break;
    }
  }

  public confirmGallerySectionChanges() {
    if (this.gallerySectionToEditData.title) {
      console.log('TRYING TO DO CALLBACK!!')
      this.data.callbackMessageResult(ModalOutcomeOptions.Update, this.gallerySectionToEditData);
    }
  }

  // public pageRendered() {
  //   // if (this.adjustDocumentSize && this.contentType.includes('pdf')) {
  //     this.pdfComponent.pdfViewer.currentScaleValue = 'page-fit';
  //     // this.adjustDocumentSize = false;
  //     // this.viewerZoom = Math.round(this.pdfComponent.pdfViewer.currentScale * 100);
  //   // }

  // }

}
