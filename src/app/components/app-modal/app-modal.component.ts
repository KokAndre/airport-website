import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { ModalDetails } from 'src/app/models/app-modal.model';
import { GetGalleryDataResponse } from 'src/app/models/get-gallery-data-response.model';
import { SubmitInterestedInPropertyRequest } from 'src/app/models/submit-interested-in-property-request.model';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements OnInit {
  public isLoading = true;
  public modalTypesEnum = ModalTypes;
  public modalOutcomeOptions = ModalOutcomeOptions;
  public gallerySectionToEditData: GetGalleryDataResponse.Section;
  public interestedInPropertyFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalDetails, public formBuilder: FormBuilder, public loginService: LoginService) { }

  ngOnInit() {
    this.initializeModalData()
  }

  public initializeModalData() {
    switch (this.data.type) {
      case ModalTypes.CaptureGallerySectionTitle:
        if (this.data.inputValues) {
          this.gallerySectionToEditData = this.data.inputValues;
        } else {
          this.gallerySectionToEditData = new GetGalleryDataResponse.Section;
          this.gallerySectionToEditData.images = new Array<GetGalleryDataResponse.Image>;
        }
        this.isLoading = false;
        break;

      case ModalTypes.InterestedInPropertyModal:
        this.initializeInterestedInPropertyFormControls();
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

  public initializeInterestedInPropertyFormControls() {
    this.interestedInPropertyFormGroup = this.formBuilder.group({
      interestedInPropertyNameControl: new FormControl('', [Validators.required]),
      interestedInPropertyEmailControl: new FormControl('', [Validators.required]),
      interestedInPropertyPhoneNumberControl: new FormControl('', [Validators.required])
    });

    this.checkIfUserIsLoggedIn();

    this.isLoading = false;
  }

  public checkIfUserIsLoggedIn() {
    const userDetails = this.loginService.getLoggedInUserDetails(true);
    console.log('USER DETAIL: ', userDetails);
    if (userDetails) {
      if (userDetails.name && userDetails.surname) {
        this.interestedInPropertyNameControl.setValue(`${userDetails.name} ${userDetails.surname}`);
      }
      
      if (userDetails.email) {
        this.interestedInPropertyEmailControl.setValue(userDetails.email);
      }
      
      if (userDetails.phoneNumber) {
        this.interestedInPropertyPhoneNumberControl.setValue(userDetails.phoneNumber);
      }
    }
  }

  public downloadDocument() {
    if (this.data.title && this.data.details) {
      fetch(this.data.details)
        .then(response => response.blob())
        .then(blob => {

          // Create new blob to add content type
          const pdfBlob = new Blob([blob], { type: 'application/pdf' });
          // Create the url to open the blob in a new window
          const data = window.URL.createObjectURL(pdfBlob);

          // Create an a tag to download the file
          const link = document.createElement('a');
          link.href = data;
          link.download = this.data.title;
          link.click();
        });
    }
  }

  public submitInterestedInPropertyForm() {
    const returnData = new SubmitInterestedInPropertyRequest();

    returnData.name = this.interestedInPropertyNameControl.value;
    returnData.email = this.interestedInPropertyEmailControl.value;
    returnData.phoneNumber = this.interestedInPropertyPhoneNumberControl.value;

    this.data.callbackMessageResult(ModalOutcomeOptions.Confirm, returnData);
  }

  public get interestedInPropertyNameControl() {
    return this.interestedInPropertyFormGroup.get('interestedInPropertyNameControl');
  }
  public get interestedInPropertyEmailControl() {
    return this.interestedInPropertyFormGroup.get('interestedInPropertyEmailControl');
  }
  public get interestedInPropertyPhoneNumberControl() {
    return this.interestedInPropertyFormGroup.get('interestedInPropertyPhoneNumberControl');
  }

}
