import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { LoginToken } from 'src/app/models/login-token.model';
import { SubmitGettingToKnowYouRequest } from 'src/app/models/submit-getting-to-know-you-request.model';
import { LoginService } from 'src/app/services/login/login.service';
import { MembersService } from '../../services/members.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getting-to-know-you',
  templateUrl: './getting-to-know-you.component.html',
  styleUrls: ['./getting-to-know-you.component.scss']
})
export class GettingToKnowYouComponent implements OnInit {
  public isWelcomeExpanded = true;
  public isFormExpanded = true;
  public gettingToKnowYouFormGroup: FormGroup;
  public loggedInUserDetails: LoginToken;
  public submitItemSucessId: number;
  public gettingToKnowYouRequestData = new SubmitGettingToKnowYouRequest.RootObject();

  constructor(public loginService: LoginService,
    public formBuilder: FormBuilder,
    public membersService: MembersService,
    public appModalService: AppModalService,
    public router: Router) { }

  ngOnInit() {
    this.getUserData();
    this.initializeFollowUsControls();
  }

  public getUserData() {
    this.loggedInUserDetails = this.loginService.getLoggedInUserDetails();
  }

  public initializeFollowUsControls() {
    this.gettingToKnowYouFormGroup = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      phoneNumberControl: new FormControl('', [Validators.required, Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
      emergencyContactOneNameControl: new FormControl('', [Validators.required]),
      emergencyContactOnePhoneNumberControl: new FormControl('', [Validators.required, Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
      emergencyContactTwoNameControl: new FormControl(''),
      emergencyContactTwoPhoneNumberControl: new FormControl('', [Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
      whereWereYouBornControl: new FormControl('', [Validators.required]),
      iFlyBecauseControl: new FormControl('', [Validators.required]),
      iLoveTedderfieldControl: new FormControl('', [Validators.required]),
      whenIAmNotFlyingControl: new FormControl('', [Validators.required]),
      whoInspiresYouControl: new FormControl('', [Validators.required]),
      whatStressesYouMostControl: new FormControl('', [Validators.required]),
      yourMostUsefullTalentControl: new FormControl('', [Validators.required]),
      howFarDoYouDriveControl: new FormControl('', [Validators.required]),
      immediateFamilyControl: new FormControl('', [Validators.required]),
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

  public numberControlInput(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.removeNonNumericCharacters(formControl?.value);
    formControl?.setValue(valueToSet);
  }

  public numberControlInputWithDecimals(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.inputBoxSeparatorWithDecimalsAndCommas(formControl?.value);
    formControl?.setValue(valueToSet);
  }


  public keydownOnBulletPointControl(formControl?: AbstractControl) {
    if (!formControl.value) {
      formControl.setValue('• ');
    }
  }

  public inputOnBulletPointControl(formControl: AbstractControl, keyPressed: any) {
    if (!formControl.value) {
      formControl.setValue('• ');
    }

    const numOfLines = formControl.value?.split('\n')?.length;

    if (keyPressed.keyCode === '13' || keyPressed.keyCode === 13 || keyPressed.key === 'Enter') {
      if (numOfLines <= 10) {
        let formCotrolValue = formControl.value;
        formCotrolValue += '• ';
        formControl.setValue(formCotrolValue);
      } else {
        let formCotrolValue = formControl.value;
        const lastIndex = formCotrolValue.lastIndexOf('\n');
        formCotrolValue = formCotrolValue.substr(0, lastIndex);
        formControl.setValue(formCotrolValue);
      }
    }

    if (keyPressed.key === ',') {
      if (numOfLines < 10) {
        let formCotrolValue = formControl.value;
        formCotrolValue = formCotrolValue.replace(',', "\n")
        formCotrolValue += '• ';
        formControl.setValue(formCotrolValue);
      } else {
        let formCotrolValue = formControl.value;
        const lastIndex = formCotrolValue.lastIndexOf(',');
        formCotrolValue = formCotrolValue.substr(0, lastIndex);
        formControl.setValue(formCotrolValue);
      }
    }

  }

  public blurOnBulletPointControl(formControl: AbstractControl) {
    if (formControl?.value === '• ' || formControl?.value === '•') {
      formControl.setValue('');
    }
  }

  public deleteImage() {
    this.gettingToKnowYouRequestData.image = new SubmitGettingToKnowYouRequest.Image();
  }

  public updateUploadedImage(uploadedImages: SubmitGettingToKnowYouRequest.Image[]) {
    if (uploadedImages?.length > 0) {
      const uploadedImageToAdd = uploadedImages[0];

      if (!this.gettingToKnowYouRequestData.image) {
        this.gettingToKnowYouRequestData.image = new SubmitGettingToKnowYouRequest.Image();
      }

      this.gettingToKnowYouRequestData.image = uploadedImageToAdd;
    }
  }

  public isSubmitDisabled() {
    if (this.gettingToKnowYouFormGroup.invalid) {
      return true;
    }

    if (this.emergencyContactTwoNameControl.value && (!this.emergencyContactTwoPhoneNumberControl.valid || !this.emergencyContactTwoPhoneNumberControl.value)) {
      return true;
    }

    if ((!this.emergencyContactTwoNameControl.value || !this.emergencyContactTwoPhoneNumberControl.valid) && this.emergencyContactTwoPhoneNumberControl.value) {
      return true;
    }

    if (!this.gettingToKnowYouRequestData?.image?.fileName || !this.gettingToKnowYouRequestData?.image?.fileName) {
      return true;
    }

    return false;
  }

  public formatBulletPointInputValuesToSubmit(valueToFormat: string) {
    let arrayOfInputValue = valueToFormat.split('\n');
    arrayOfInputValue = arrayOfInputValue.map(line => {
      line = line.replace('•', '');
      line = line.trim();
      return line;
    });
    arrayOfInputValue = arrayOfInputValue.filter(x => x !== '');

    return arrayOfInputValue;
  }

  public submitClicked() {
    this.gettingToKnowYouRequestData.name = this.nameControl.value;
    this.gettingToKnowYouRequestData.email = this.emailControl.value;
    this.gettingToKnowYouRequestData.phoneNumber = this.phoneNumberControl.value;
    this.gettingToKnowYouRequestData.emergencyContactOneName = this.emergencyContactOneNameControl.value;
    this.gettingToKnowYouRequestData.emergencyContactOnePhoneNumber = this.emergencyContactOnePhoneNumberControl.value;
    this.gettingToKnowYouRequestData.whereWereYouBorn = this.whereWereYouBornControl.value;
    this.gettingToKnowYouRequestData.howFarDoYouDrive = this.howFarDoYouDriveControl.value;

    this.gettingToKnowYouRequestData.iFlyBecause = this.formatBulletPointInputValuesToSubmit(this.iFlyBecauseControl.value);
    this.gettingToKnowYouRequestData.iLoveTedderfield = this.formatBulletPointInputValuesToSubmit(this.iLoveTedderfieldControl.value);
    this.gettingToKnowYouRequestData.whenIAmNotFlying = this.formatBulletPointInputValuesToSubmit(this.whenIAmNotFlyingControl.value);
    this.gettingToKnowYouRequestData.whoInspiresYou = this.formatBulletPointInputValuesToSubmit(this.whoInspiresYouControl.value);
    this.gettingToKnowYouRequestData.whatStressesYouMost = this.formatBulletPointInputValuesToSubmit(this.whatStressesYouMostControl.value);
    this.gettingToKnowYouRequestData.yourMostUsefullTalent = this.formatBulletPointInputValuesToSubmit(this.yourMostUsefullTalentControl.value);
    this.gettingToKnowYouRequestData.immediateFamily = this.formatBulletPointInputValuesToSubmit(this.immediateFamilyControl.value);

    if (this.emergencyContactTwoNameControl.value && this.emergencyContactTwoPhoneNumberControl.value) {
      this.gettingToKnowYouRequestData.emergencyContactTwoName = this.emergencyContactTwoNameControl.value;
      this.gettingToKnowYouRequestData.emergencyContactTwoPhoneNumber = this.emergencyContactTwoPhoneNumberControl.value;
    }

    console.log('SUBMIT DATA: ', this.gettingToKnowYouRequestData);

  //   this.membersService.submitGettingToKnowYou(this.gettingToKnowYouRequestData).then(results => {
  //     if (results.status === 200) {
  //       this.submitItemSucessId = results.id;
  //       this.uploadImage();
  //     } else {
  //       this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Getting To Know You', results.message, null);
  //     }
  //   });
  }

  public uploadImage() {
    this.membersService.uploadGettingToKnowImage(this.submitItemSucessId, this.gettingToKnowYouRequestData.image).then(results => {
      if (results.status === 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Getting To Know You', 'Your details have been capture seccessfully.', null);
        this.loginService.updateUserHasCompletedGettingToKnowYou();
        this.router.navigateByUrl(AppRoutes.WhosWhoInTheZoo);
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Getting To Know You', results.message, null);
      }
    });
  }














  public get nameControl() {
    return this.gettingToKnowYouFormGroup.get('nameControl');
  }
  public get emailControl() {
    return this.gettingToKnowYouFormGroup.get('emailControl');
  }
  public get phoneNumberControl() {
    return this.gettingToKnowYouFormGroup.get('phoneNumberControl');
  }
  public get emergencyContactOneNameControl() {
    return this.gettingToKnowYouFormGroup.get('emergencyContactOneNameControl');
  }
  public get emergencyContactOnePhoneNumberControl() {
    return this.gettingToKnowYouFormGroup.get('emergencyContactOnePhoneNumberControl');
  }
  public get emergencyContactTwoNameControl() {
    return this.gettingToKnowYouFormGroup.get('emergencyContactTwoNameControl');
  }
  public get emergencyContactTwoPhoneNumberControl() {
    return this.gettingToKnowYouFormGroup.get('emergencyContactTwoPhoneNumberControl');
  }
  public get whereWereYouBornControl() {
    return this.gettingToKnowYouFormGroup.get('whereWereYouBornControl');
  }
  public get iFlyBecauseControl() {
    return this.gettingToKnowYouFormGroup.get('iFlyBecauseControl');
  }
  public get iLoveTedderfieldControl() {
    return this.gettingToKnowYouFormGroup.get('iLoveTedderfieldControl');
  }
  public get whenIAmNotFlyingControl() {
    return this.gettingToKnowYouFormGroup.get('whenIAmNotFlyingControl');
  }
  public get whoInspiresYouControl() {
    return this.gettingToKnowYouFormGroup.get('whoInspiresYouControl');
  }
  public get whatStressesYouMostControl() {
    return this.gettingToKnowYouFormGroup.get('whatStressesYouMostControl');
  }
  public get yourMostUsefullTalentControl() {
    return this.gettingToKnowYouFormGroup.get('yourMostUsefullTalentControl');
  }
  public get howFarDoYouDriveControl() {
    return this.gettingToKnowYouFormGroup.get('howFarDoYouDriveControl');
  }
  public get immediateFamilyControl() {
    return this.gettingToKnowYouFormGroup.get('immediateFamilyControl');
  }
}
