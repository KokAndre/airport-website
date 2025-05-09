import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ModalTypes } from 'src/app/enums/app.enums';
import { UploadImageRequest } from 'src/app/models/upload-image-request.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  @Input() public returnAsFile = false;
  @Output() public imageUploadedEmit = new EventEmitter();
  @ViewChild('imageUploader', { static: true }) imageUploader: ElementRef;

  constructor(public appModalService: AppModalService, private imageCompress: NgxImageCompressService) { }

  ngOnInit() {
  }

  public async uploadImage(event: any) {
    let status = false;
    const files = event.target.files;
    status = event.target.files.length > 0 ? true : false;

    const filesToEmit = new Array<UploadImageRequest.FileData>();

    if (status == true) {
      let setImageDataResolver = new Promise((resolve, reject) => {

        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            const imageSrc = reader.result || '';
            const fileDataToAdd = new UploadImageRequest.FileData();
            fileDataToAdd.imageName = file.name;

            if (this.returnAsFile) {
              fileDataToAdd.imageData = file;
            } else {
              if (file.size > 500000 && !fileDataToAdd.imageName.includes('.NEF') && !fileDataToAdd.imageName.includes('.nef')) {
                const imageToCompress = {
                  image: imageSrc as string,
                  orientation: 1,
                  fileName: file.name
                }
                await this.imageCompress
                  .getImageWithMaxSizeAndMetas(imageToCompress, 0.5) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
                  .then(
                    (result) => {
                      fileDataToAdd.imageData = result.image;
                    },
                    (result: string) => {
                      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload image', 'The file size was too big. Please try uploading a smaller file.', null);
                    }
                  );
              } else {
                fileDataToAdd.imageData = imageSrc;
              }
            }

            filesToEmit.push(fileDataToAdd);

            if (index === files.length - 1) {
              resolve('');
            }
          }
        }
      });

      setImageDataResolver.then(() => {
        this.imageUploadedEmit.emit(filesToEmit);
      });

    } else {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Error uploading image', 'No file was selected.', null);
    }
  }

  handleClick() {
    this.imageUploader.nativeElement.click();
  }

}
