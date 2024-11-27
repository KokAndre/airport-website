import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ModalTypes } from 'src/app/enums/app.enums';
import { SellMyHangerRequest } from 'src/app/models/sell-my-hanger-request.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @Input() public numOfFilesAllowed = 1;
  @Input() public allowSelectImages = false;
  @Input() public maxFileSize = 10000000; // This defaults to 10MB
  @Input() public returnAsFile = false;
  @Input() public isFromMembersDocumentsAddFile = false;
  @Output() public emitFileData: EventEmitter<SellMyHangerRequest.FileData[]> = new EventEmitter<SellMyHangerRequest.FileData[]>();
  // @Output() public emitFileDataAsFile = new EventEmitter<any>();
  @ViewChild('fileUploaded', { static: true }) fileUploaded: ElementRef;

  public fileUploadTypes = '.pdf, .PDF';
  public imageUploadTypes = '.PNG, .JPG, .JPEG, .SVG ';

  constructor(public appModalService: AppModalService, private imageCompress: NgxImageCompressService) { }

  ngOnInit() {
  }

  handleClick() {
    this.fileUploaded.nativeElement.click();
  }

  public async uploadItem(event: any) {
    let status = false;
    let files = event.target.files;
    status = event.target.files.length > 0 ? true : false;

    if (status == true) {
      this.uploadFile(files);
    } else {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Error uploading image', 'No file was selected.', null);
    }
  }

  public uploadFile(files: any) {
    const filesToEmit = new Array<SellMyHangerRequest.FileData>();

    let setImageDataResolver = new Promise((resolve, reject) => {

      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        if (file.size <= this.maxFileSize) {

          // if (this.returnAsFile) {
          //   this.emitFileDataAsFile.emit(file);
          // } else {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            const imageSrc = reader.result || '';
            const fileDataToAdd = new SellMyHangerRequest.FileData();
            fileDataToAdd.fileName = file.name;

            if (this.returnAsFile) {
              fileDataToAdd.fileData = file;
            } else {
              if (file.size > 500000 && this.allowSelectImages) {
                const imageToCompress = {
                  image: imageSrc as string,
                  orientation: 1,
                  fileName: file.name
                }
                await this.imageCompress
                  .getImageWithMaxSizeAndMetas(imageToCompress, 0.5) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
                  .then(
                    (result) => {
                      fileDataToAdd.fileData = result.image;
                    },
                    (result: string) => {
                      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload image', 'The file size was too big. Please try uploading a smaller file.', null);
                    }
                  );
              } else {
                fileDataToAdd.fileData = imageSrc;
              }
            }

            filesToEmit.push(fileDataToAdd);

            if (index === files.length - 1) {
              resolve('');
            }
            // }
          }
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Max file size exceeded', 'The file you selected is to big. The max file size is: ' + (this.maxFileSize / 1000000) + 'MB', null);
        }
      }
    });

    setImageDataResolver.then(() => {
      this.emitFileData.emit(filesToEmit);
      this.fileUploaded.nativeElement.value = '';
    });
  }

}
