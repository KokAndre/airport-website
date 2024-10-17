import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalTypes } from 'src/app/enums/app.enums';
import { UploadImageRequest } from 'src/app/models/upload-image-request.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  @Output() public imageUploadedEmit = new EventEmitter();

  @ViewChild('imageUploader', { static: true }) imageUploader: ElementRef;

  constructor(public appModalService: AppModalService) { }

  ngOnInit() {
  }

  public uploadImage(event: any) {
    console.log('EVENT: ', event);

    // console.log('SECTION: ', this.section);

    // if (!this.section?.sectionId) {
    //   this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Error uploading image', 'No section ID is present in request. Please contact administrator', null);
    // }

    // const file:File = event.target.files[0];
    // console.log('FILE ARRAY: ', file);
    // if (file) {
    //   console.log('FILES: ', file);
    // }

    let status = false;
    const file = event.target.files[0];
    status = event.target.files.length > 0 ? true : false;

    console.log("FILE: ", file);
    if (status == true) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageSrc = reader.result;
        // console.log('GOING TO EMIT: ', imageSrc);
        const dataToEmit = new UploadImageRequest.RootObject();
        dataToEmit.imageData = imageSrc;
        dataToEmit.imageName = file.name;

        this.imageUploadedEmit.emit(dataToEmit);
      }
    } else {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Error uploading image', 'No file was selected.', null);
    }
  }

  handleClick() {
    this.imageUploader.nativeElement.click();
  }

}
