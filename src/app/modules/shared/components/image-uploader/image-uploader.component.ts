import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalTypes } from 'src/app/enums/app.enums';
import { SectionDataModel } from 'src/app/modules/gallery/models/section-data.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  @Input() public section: SectionDataModel.Section;

  @ViewChild('imageUploader', { static: true }) imageUploader: ElementRef;

  constructor(public appModalService: AppModalService) { }

  ngOnInit() {
  }

  public uploadImage(event: any) {
    console.log('EVENT: ', event);

    console.log('SECTION: ', this.section);

    if(!this.section?.sectionId) {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Error uploading image', 'No section ID is present in request. Please contact administrator', null);
    }

    const file:File = event.target.files[0];
    console.log('FILE ARRAY: ', file);
    if (file) {
      console.log('FILES: ', file);
    }
  }

  handleClick() {
    this.imageUploader.nativeElement.click();
  }

}
