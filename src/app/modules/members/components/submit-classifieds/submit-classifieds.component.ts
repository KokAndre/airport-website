import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { LoginToken } from 'src/app/models/login-token.model';
import { SubmitClassifiedsRequest } from 'src/app/models/submit-classifieds-request.model';
import { LoginService } from 'src/app/services/login/login.service';
import { MembersService } from '../../services/members.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalTypes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-submit-classifieds',
  templateUrl: './submit-classifieds.component.html',
  styleUrls: ['./submit-classifieds.component.scss']
})
export class SubmitClassifiedsComponent implements OnInit {
  public isWelcomeExpanded = true;
  public isHowToAdvertideExpanded = true;
  public isFormExpanded = true;
  public isPostYourAdNowExpanded = true;
  public submitClassifiedsFormGroup: FormGroup;
  public loggedInUserDetails: LoginToken;
  public submitClassifiedsRequestData = new SubmitClassifiedsRequest.RootObject();
  public submitItemSucessId: number;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private appModalService: AppModalService,
    private membersService: MembersService) { }

  ngOnInit() {
    this.getUserData();
    this.initializeFollowUsControls();
  }

  public getUserData() {
    this.loggedInUserDetails = this.loginService.getLoggedInUserDetails();
  }

  public initializeFollowUsControls() {
    this.submitClassifiedsFormGroup = this.formBuilder.group({
      titleControl: new FormControl('', [Validators.required]),
      categorySelectControl: new FormControl('', [Validators.required]),
      otherCategoryControl: new FormControl(''),
      descriptionControl: new FormControl('', [Validators.required]),
      priceControl: new FormControl('', [Validators.required]),
      locationSelectControl: new FormControl('', [Validators.required]),
      locationOtherControl: new FormControl(''),
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      phoneNumberControl: new FormControl('', [Validators.required]),
      conditionSelectControl: new FormControl('', [Validators.required]),
      availabilitySelectControl: new FormControl('', [Validators.required]),
      availabliliyWaitingPeriodControl: new FormControl(''),
      specialNotesControl: new FormControl('', [Validators.required]),
    });
    this.prePopulateData();
  }

  public prePopulateData() {
    if (this.loggedInUserDetails?.name && this.loggedInUserDetails?.surname) {
      this.nameControl.setValue(this.loggedInUserDetails.name + ' ' + this.loggedInUserDetails.surname);
      this.nameControl.disable();
    }

    if (this.loggedInUserDetails?.email) {
      this.emailControl.setValue(this.loggedInUserDetails.email);
      this.emailControl.disable();
    }

    if (this.loggedInUserDetails?.phoneNumber) {
      this.phoneNumberControl.setValue(this.loggedInUserDetails.phoneNumber);
      this.phoneNumberControl.disable();
    }
  }

  public numberControlInputWithDecimal(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.inputBoxSeparatorWithDecimalsAndCommas(formControl?.value);
    formControl?.setValue(valueToSet);
  }

  public thousandSeparatorControlInput(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.includeDecimalsOnInputValue(formControl?.value);
    formControl?.setValue(valueToSet);
  }

  public numberControlInput(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.removeNonNumericCharacters(formControl?.value);
    formControl?.setValue(valueToSet);
  }

  public updateItemImages(uploadedImages: SubmitClassifiedsRequest.Image[]) {
    if (uploadedImages?.length > 0) {
      if (uploadedImages.length > 4) {
        uploadedImages = uploadedImages.splice(3);
      }

      if (!this.submitClassifiedsRequestData.images) {
        this.submitClassifiedsRequestData.images = new Array<SubmitClassifiedsRequest.Image>();
      }

      uploadedImages.forEach(image => {
        if (image.fileName && image.fileData) {
          if (!this.submitClassifiedsRequestData.images.find(x => x.fileName === image.fileName)) {
            this.submitClassifiedsRequestData.images.push(image);
          }
        }
      });

      if (this.submitClassifiedsRequestData.images.length > 4) {
        this.submitClassifiedsRequestData.images.splice(0, (this.submitClassifiedsRequestData.images.length - 4));
      }
    }
  }

  public deleteItemImage(fileName: string) {
    this.submitClassifiedsRequestData.images = this.submitClassifiedsRequestData.images.filter(x => x.fileName !== fileName);
  }

  public resetControl(controlToReset: AbstractControl) {
    controlToReset.reset();
    controlToReset.setErrors(null);
  }

  public isSubmitDisabled() {
    if (this.submitClassifiedsFormGroup.invalid) {
      return true;
    }

    if (this.categorySelectControl?.value === 'Other') {
      if (!this.otherCategoryControl?.value) {
        return true;
      }
    }

    if (this.locationSelectControl?.value === 'Other') {
      if (!this.locationOtherControl?.value) {
        return true;
      }
    }

    if (this.availabilitySelectControl?.value === 'Other') {
      if (!this.availabliliyWaitingPeriodControl?.value) {
        return true;
      }
    }

    if (!this.submitClassifiedsRequestData.images?.length) {
      return true;
    }

    return false;
  }

  public submitClicked() {
    this.submitClassifiedsRequestData.title = this.titleControl.value;
    this.submitClassifiedsRequestData.description = this.descriptionControl.value;
    this.submitClassifiedsRequestData.price = this.priceControl.value;
    this.submitClassifiedsRequestData.name = this.nameControl.value;
    this.submitClassifiedsRequestData.email = this.emailControl.value;
    this.submitClassifiedsRequestData.phoneNumber = this.phoneNumberControl.value;
    this.submitClassifiedsRequestData.condition = this.conditionSelectControl.value;
    this.submitClassifiedsRequestData.specialNotes = this.specialNotesControl.value;


    if (this.availabilitySelectControl.value === 'Other') {
      this.submitClassifiedsRequestData.availability = this.availabliliyWaitingPeriodControl.value;
    } else {
      this.submitClassifiedsRequestData.availability = this.availabilitySelectControl.value;
    }

    if (this.locationSelectControl.value === 'Other') {
      this.submitClassifiedsRequestData.location = this.locationOtherControl.value;
    } else {
      this.submitClassifiedsRequestData.location = this.locationSelectControl.value;
    }

    if (this.categorySelectControl.value === 'Other') {
      this.submitClassifiedsRequestData.category = this.otherCategoryControl.value;
    } else {
      this.submitClassifiedsRequestData.category = this.categorySelectControl.value;
    }

    this.membersService.submitClassifiedsItem(this.submitClassifiedsRequestData).then(results => {
      if (results.status === 200) {
        this.submitItemSucessId = results.id;
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Classifieds', 'Your item has been captured successfully.', null);
        this.uploadImages();
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Classifieds', results.message, null);
      }
    });
  }

  private async uploadImages() {
    for (let index = 0; index < this.submitClassifiedsRequestData.images?.length; index++) {
      const image = this.submitClassifiedsRequestData.images[index];
      if (image.fileName && image.fileData) {
        await this.membersService.uploadClassifiedsItemImages(this.submitItemSucessId, image).then(results => {
          if (results.status === 200) {
          } else {
            this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload images', results.message, null);
          }
        });
      }
    }

    this.resetForm();
  }

  public resetForm() {
    this.submitClassifiedsRequestData = new SubmitClassifiedsRequest.RootObject();
    this.submitClassifiedsFormGroup.reset();
    this.prePopulateData();
  }

  public get titleControl() {
    return this.submitClassifiedsFormGroup.get('titleControl');
  }
  public get categorySelectControl() {
    return this.submitClassifiedsFormGroup.get('categorySelectControl');
  }
  public get otherCategoryControl() {
    return this.submitClassifiedsFormGroup.get('otherCategoryControl');
  }
  public get descriptionControl() {
    return this.submitClassifiedsFormGroup.get('descriptionControl');
  }
  public get priceControl() {
    return this.submitClassifiedsFormGroup.get('priceControl');
  }
  public get locationSelectControl() {
    return this.submitClassifiedsFormGroup.get('locationSelectControl');
  }
  public get locationOtherControl() {
    return this.submitClassifiedsFormGroup.get('locationOtherControl');
  }
  public get nameControl() {
    return this.submitClassifiedsFormGroup.get('nameControl');
  }
  public get emailControl() {
    return this.submitClassifiedsFormGroup.get('emailControl');
  }
  public get phoneNumberControl() {
    return this.submitClassifiedsFormGroup.get('phoneNumberControl');
  }
  public get conditionSelectControl() {
    return this.submitClassifiedsFormGroup.get('conditionSelectControl');
  }
  public get availabilitySelectControl() {
    return this.submitClassifiedsFormGroup.get('availabilitySelectControl');
  }
  public get availabliliyWaitingPeriodControl() {
    return this.submitClassifiedsFormGroup.get('availabliliyWaitingPeriodControl');
  }
  public get specialNotesControl() {
    return this.submitClassifiedsFormGroup.get('specialNotesControl');
  }
}