import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { LoginToken } from 'src/app/models/login-token.model';
import { UpdateMemberDataRequest } from 'src/app/models/update-user-data-request';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  public isExplinationExpanded = true;
  public isProfileFormExpanded = true;
  public memberFormGroup: FormGroup;
  public userDetails: LoginToken;
  public isLoading = true;

  constructor(private formBuilder: FormBuilder,
    public loginService: LoginService,
    public appModalService: AppModalService,
    public router: Router) { }

  ngOnInit() {
    this.getUserData();
  }

  public getUserData() {
    this.userDetails = this.loginService.getLoggedInUserDetails();
    if (!this.userDetails) {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'User not logged in', 'You are not logged in. Please log in and try again.', null);
      this.router.navigateByUrl(AppRoutes.Home);
    } else {
      this.initializeFormControls();
    }
  }

  public initializeFormControls() {
    this.memberFormGroup = this.formBuilder.group({
      nameControl: new FormControl(this.userDetails.name || '', [Validators.required]),
      surnameControl: new FormControl(this.userDetails.surname || '', [Validators.required]),
      phoneNumberControl: new FormControl(this.userDetails.phoneNumber || '', [Validators.required, Validators.maxLength(10), Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
      emailControl: new FormControl(this.userDetails.email || '', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      hangarNumbersControl: new FormControl(''),
      standNumbersControl: new FormControl(''),
    });

    this.prePopulateData();
    this.isLoading = false;
  }

  public prePopulateData() {
    if (this.userDetails.hangarNumbers?.includes(',')) {
      const hangarsArray = this.userDetails.hangarNumbers.split(',');
      let hangarDataToSet = '';
      hangarsArray.forEach((item, last) => {
        if (last) {
          hangarDataToSet += '• ' + item;
        } else {
          hangarDataToSet += '• ' + item + '\n';
        }
      });
      this.hangarNumbersControl.setValue(hangarDataToSet);
    } else {
      this.hangarNumbersControl.setValue(this.userDetails.hangarNumbers ? '• ' + this.userDetails.hangarNumbers : '');
    }

    if (this.userDetails.standNumbers?.includes(',')) {
      const standsArray = this.userDetails.standNumbers.split(',');
      let standDataToSet = '';
      standsArray.forEach((item, last) => {
        if (last) {
          standDataToSet += '• ' + item;
        } else {
          standDataToSet += '• ' + item + '\n';
        }
        this.standNumbersControl.setValue(standDataToSet);
      });
    } else {
      this.standNumbersControl.setValue(this.userDetails.standNumbers ? '• ' + this.userDetails.standNumbers : '');
    }
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

    // Check that no text is placed before the bullet points
    const allLinesArray = formControl.value?.split('\n');
    if (allLinesArray.find(x => x.slice(0, 1) !== '•')) {
      let newValueToSetAfterRemovingBulletPreText = '';

      allLinesArray.forEach((line, last) => {
        if (line.slice(0, 1) !== '•') {
          const bulletPointIndex = line.lastIndexOf('•');
          const newValueToSet = line.slice(bulletPointIndex, line.length);

          if (last) {
            newValueToSetAfterRemovingBulletPreText += newValueToSet;
          } else {
            newValueToSetAfterRemovingBulletPreText += newValueToSet + '\n';
          }
        } else {
          if (last) {
            newValueToSetAfterRemovingBulletPreText += line;
          } else {
            newValueToSetAfterRemovingBulletPreText += line + '\n';
          }
        }

        formControl.setValue(newValueToSetAfterRemovingBulletPreText);
      });
    }

    if (allLinesArray.find(x => !x.includes('•'))) {
      let newValueToSetAfterRemovingBulletPreText = '';
      allLinesArray.forEach((line, last) => {
        if (!line.includes('•')) {

          if (last) {
            newValueToSetAfterRemovingBulletPreText += '• ' + line;
          } else {
            newValueToSetAfterRemovingBulletPreText += '• ' + line + '\n';
          }
        } else {
          if (last) {
            newValueToSetAfterRemovingBulletPreText += line;
          } else {
            newValueToSetAfterRemovingBulletPreText += line + '\n';
          }
        }

        formControl.setValue(newValueToSetAfterRemovingBulletPreText);
      });
    }

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
    } else {
      //Remove all empty lines
      const allLinesArray = formControl.value?.split('\n');
      let newValueToSetAfterRemovingEmptyLines = '';
      allLinesArray.forEach((line, last) => {
        if (line === '•' || line === '• ' || line === ' •' || line === ' • ' || line === '') {
          //
        } else {
          if (last || allLinesArray.length === 1) {
            newValueToSetAfterRemovingEmptyLines += line;
          } else {
            newValueToSetAfterRemovingEmptyLines += line + '\n';
          }
        }
      });

      formControl.setValue(newValueToSetAfterRemovingEmptyLines);
    }
  }

  public formatBulletPointInputValuesToSubmit(valueToFormat: string) {
    let arrayOfInputValue = valueToFormat.split('\n');
    arrayOfInputValue = arrayOfInputValue.map(line => {
      line = line.replace('•', '');
      line = line.trim();
      line = line.replaceAll("'", "`");
      return line;
    });
    arrayOfInputValue = arrayOfInputValue.filter(x => x !== '');

    return arrayOfInputValue;
  }

  public isSubmitDisabled() {
    if (this.memberFormGroup.invalid) {
      return true;
    }

    if (!this.hangarNumbersControl.value && !this.standNumbersControl.value) {
      return true;
    }

    // Check if ant values have been updated
    let hasValuesChanged = false;
    if (this.userDetails.name !== this.nameControl.value || this.userDetails.surname !== this.surnameControl.value || this.userDetails.email !== this.emailControl.value || this.userDetails.phoneNumber !== this.phoneNumberControl.value) {
      hasValuesChanged = true;
    }

    const newHangarNumbersArray = this.formatBulletPointInputValuesToSubmit(this.hangarNumbersControl.value);
    const originalHangarNumbersArray = this.userDetails?.hangarNumbers?.split(',');
    if (JSON.stringify(originalHangarNumbersArray) !== JSON.stringify(newHangarNumbersArray)) {
      hasValuesChanged = true;
    }

    const newStandNumbersArray = this.formatBulletPointInputValuesToSubmit(this.standNumbersControl.value);
    const originalStandNumbersArray = this.userDetails?.standNumbers?.split(',');
    if (JSON.stringify(originalStandNumbersArray) !== JSON.stringify(newStandNumbersArray)) {
      hasValuesChanged = true;
    }

    return !hasValuesChanged;
  }

  public submitClicked() {
    const requestData = new UpdateMemberDataRequest.RootObject();
    requestData.id = this.userDetails.id;
    requestData.name = this.nameControl.value;
    requestData.surname = this.surnameControl.value;
    requestData.email = this.emailControl.value;
    requestData.phoneNumber = this.phoneNumberControl.value;
    requestData.hangarNumbers = this.formatBulletPointInputValuesToSubmit(this.hangarNumbersControl.value);
    requestData.standNumbers = this.formatBulletPointInputValuesToSubmit(this.standNumbersControl.value);

    this.loginService.updateMemberData(requestData).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Update profile data', results.message, null);
      if (results.status === 200) {
        this.getUserData();
      }
    });
  }

  public get nameControl() {
    return this.memberFormGroup.get('nameControl')
  }
  public get surnameControl() {
    return this.memberFormGroup.get('surnameControl');
  }
  public get phoneNumberControl() {
    return this.memberFormGroup.get('phoneNumberControl');
  }
  public get emailControl() {
    return this.memberFormGroup.get('emailControl');
  }
  public get hangarNumbersControl() {
    return this.memberFormGroup.get('hangarNumbersControl');
  }
  public get standNumbersControl() {
    return this.memberFormGroup.get('standNumbersControl');
  }
}
