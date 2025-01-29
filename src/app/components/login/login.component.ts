import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoginRequest } from 'src/app/models/login-request.model';
import { RegisterRequest } from 'src/app/models/register-request.model';
import { LoginService } from 'src/app/services/login/login.service';
import * as zxcvbn from 'zxcvbn';
import * as CryptoJS from 'crypto-js';
import { AppRoutes, EncryptionKeys, ModalTypes, SessionStorageKeys } from 'src/app/enums/app.enums';
import { LoginToken } from 'src/app/models/login-token.model';
import * as moment from 'moment';
import { AppHelperFunction, SessionStorageHelper } from 'src/app/helpers/app-helper.functions';
import { Router } from '@angular/router';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() public userData: GetUserDataResponse.Data;
  @Output() public errorFetchingDataEmit = new EventEmitter();
  @Output() public returnToWelcomePageEmit = new EventEmitter();

  public registerFormGroup: FormGroup;
  public loginFormGroup: FormGroup;
  public hideNewPin = true;
  public hideConfirmPin = true;
  public strengthText = 'Password strength:';
  public showStrength = false;
  public passwordScore = 0;
  public passwordStrengthText: string;
  public strengthMeterClass: string;
  public passwordIsStrong = false;
  public isUserRegistered = false;
  private resizeObserver: ResizeObserver;
  public isMobileView = false;
  public displayPasswordResetScreen = false;

  constructor(public formBuilder: FormBuilder, public loginService: LoginService, public router: Router, public appModalService: AppModalService) { }

  ngOnInit() {
    this.initializeScreenSizeCheck();

    if (!this.userData) {
      this.errorFetchingDataEmit.emit();
    }

    this.isUserRegistered = this.userData.isRegistered === '1';

      this.initializeLoginControls();
      this.initializeRegisterControls();
  }

  public initializeScreenSizeCheck() {
    const body = document.getElementsByTagName("body")[0];
    this.resizeObserver = new ResizeObserver(() => {
      const widthToCheck = window.innerWidth;
      if (widthToCheck < 857) {
        this.isMobileView = true;
      } else {
        this.isMobileView = false;
      }
    });

    // Add a listener to body
    this.resizeObserver.observe(body);
  }

  public initializeLoginControls() {
    this.loginFormGroup = this.formBuilder.group({
      loginEmailControl: new FormControl(this.userData.email || '', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      loginPasswordControl: new FormControl('', [Validators.required]),
    });
  }

  public initializeRegisterControls() {
    this.registerFormGroup = this.formBuilder.group({
      registerNameControl: new FormControl(this.userData.name || '', [Validators.required]),
      registerSurnameControl: new FormControl(this.userData.surname || '', [Validators.required]),
      registerPhoneNumberControl: new FormControl(this.userData.phoneNumber || '', [Validators.required, Validators.maxLength(10), Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
      registerEmailControl: new FormControl(this.userData.email || '', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      registerHangarNumbersControl: new FormControl(''),
      registerStandNumbersControl: new FormControl(''),
      registerPasswordControl: new FormControl('', [Validators.required]),
      registerConfirmPasswordControl: new FormControl('', [Validators.required]),
    });

    this.registerPasswordControl?.valueChanges.subscribe(() => {
      this.passwordLogicHandling();
    });
    this.registerConfirmPasswordControl?.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.registerConfirmPasswordControl?.markAsTouched();
      }, 500);
      this.passwordLogicHandling();
    });
  }

  passwordLogicHandling() {
    // this.disableSaveButton = true;
    this.showStrength = this.registerPasswordControl?.value.length > 0 ? true : false;
    this.passwordScore = this.getPasswordStrength(this.registerPasswordControl?.value);
    switch (this.passwordScore) {
      case 0:
        this.strengthMeterClass = 'progress-bar-25';
        this.passwordStrengthText = 'Too weak';
        this.passwordIsStrong = false;
        // this.registerConfirmPasswordControl?.disable({ onlySelf: true, emitEvent: false });
        break;
      case 1:
        this.strengthMeterClass = 'progress-bar-25';
        this.passwordStrengthText = 'Too weak';
        this.passwordIsStrong = false;
        // this.registerConfirmPasswordControl?.disable({ onlySelf: true, emitEvent: false });
        break;
      case 2:
        this.strengthMeterClass = 'progress-bar-50';
        this.passwordStrengthText = 'Not strong enough';
        this.passwordIsStrong = false;
        // this.registerConfirmPasswordControl?.disable({ onlySelf: true, emitEvent: false });
        break;
      case 3:
        this.strengthMeterClass = 'progress-bar-75';
        this.passwordStrengthText = 'Strong';
        this.passwordIsStrong = true;
        // this.registerConfirmPasswordControl?.enable({ onlySelf: true, emitEvent: false });
        break;
      case 4:
        this.strengthMeterClass = 'progress-bar-100';
        this.passwordStrengthText = 'Very Strong';
        this.passwordIsStrong = true;
        // this.registerConfirmPasswordControl?.enable({ onlySelf: true, emitEvent: false });
        break;
    }
    // only show errors when password is strong
    if (this.registerPasswordControl?.value !== this.registerConfirmPasswordControl?.value && this.passwordIsStrong) {
      this.registerConfirmPasswordControl?.value.length > 0 ? this.registerConfirmPasswordControl?.setErrors({ noMatch: true }) : this.registerConfirmPasswordControl?.setErrors({ required: true });
    } else {
      // remove all errors from confirm input
      this.registerConfirmPasswordControl?.setErrors(null);
    }

    // if (this.passwordScore >= 3 && this.registerPasswordControl?.value === this.registerConfirmPasswordControl?.value) {
    //   this.disableSaveButton = false;
    // }
  }

  public getPasswordStrength(password: string) {
    const passwordResult = zxcvbn(password);
    return passwordResult.score;
  }

  public registerClicked() {
    const requestData = new RegisterRequest();
    requestData.id = this.userData.id;
    requestData.name = this.registerNameControl?.value;
    requestData.surname = this.registerSurnameControl?.value;
    requestData.email = this.registerEmailControl?.value;
    requestData.phoneNumber = this.registerPhoneNumberControl?.value;
    requestData.password = AppHelperFunction.encryptPassword(this.registerPasswordControl?.value);
    requestData.hangarNumbers = this.formatBulletPointInputValuesToSubmit(this.registerHangarNumbersControl.value);
    requestData.standNumbers = this.formatBulletPointInputValuesToSubmit(this.registerStandNumbersControl.value);

    this.loginService.registerNewUser(requestData).then(results => {
      if (results.status === 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Register', 'You have successfully registered.', null);
        this.navigateToMembersPoliciesPage();
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Register', results.message, null);
      }
    });
  }

  public loginClicked() {
    const requestData = new LoginRequest();
    requestData.email = this.loginEmailControl?.value;
    requestData.password = AppHelperFunction.encryptPassword(this.loginPasswordControl?.value);

    this.loginService.loginUser(requestData).then(results => {
      if (results.status === 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Login', 'You have successfully logged in.', null);
        this.navigateToMembersPoliciesPage();
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Login', results.message, null);
      }
    });
  }

  public resetPasswordClicked() {
    this.loginService.sendResetPasswordEmail(this.loginEmailControl?.value).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Reset Password', results.message, null);
      if (results.status === 200) {
        this.registerFormGroup.addControl('registerPasswordResetControl', new FormControl('', [Validators.required, Validators.minLength(6)]));
        this.displayPasswordResetScreen = true;
      }
    });
  }

  public resetPassword() {

    const newPassword = AppHelperFunction.encryptPassword(this.registerPasswordControl?.value);

    this.loginService.submitResetPassword(this.loginEmailControl?.value, newPassword, this.registerPasswordResetControl.value).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Reset Password', results.message, null);
      if (results.status === 200) {
        this.cancelResetPasswordClicked();
      }
    });
  }

  public cancelResetPasswordClicked() {
    this.loginPasswordControl.reset();
    this.registerFormGroup.removeControl('registerPasswordResetControl');
    this.displayPasswordResetScreen = false;
  }

  public navigateToMembersPoliciesPage() {
    this.router.navigateByUrl(AppRoutes.Home);
  }

  public numberControlInputWithDecimals(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.removeNonNumericCharacters(formControl?.value);
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

    // if (keyPressed.key === ',') {
    //   if (numOfLines < 10) {
    //     let formCotrolValue = formControl.value;
    //     formCotrolValue = formCotrolValue.replace(',', "\n")
    //     formCotrolValue += '• ';
    //     formControl.setValue(formCotrolValue);
    //   } else {
    //     let formCotrolValue = formControl.value;
    //     const lastIndex = formCotrolValue.lastIndexOf(',');
    //     formCotrolValue = formCotrolValue.substr(0, lastIndex);
    //     formControl.setValue(formCotrolValue);
    //   }
    // }

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
          if (last) {
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
      line = line.replaceAll('•', '');
      line = line.trim();
      line = line.replaceAll("'", "`");
      return line;
    });
    arrayOfInputValue = arrayOfInputValue.filter(x => x !== '');

    return arrayOfInputValue;
  }

  public cancelClicked() {
    this.returnToWelcomePageEmit.emit();
  }

  public get registerNameControl() {
    return this.registerFormGroup.get('registerNameControl');
  }
  public get registerSurnameControl() {
    return this.registerFormGroup.get('registerSurnameControl');
  }
  public get registerEmailControl() {
    return this.registerFormGroup.get('registerEmailControl');
  }
  public get registerPhoneNumberControl() {
    return this.registerFormGroup.get('registerPhoneNumberControl');
  }
  public get registerHangarNumbersControl() {
    return this.registerFormGroup.get('registerHangarNumbersControl');
  }
  public get registerStandNumbersControl() {
    return this.registerFormGroup.get('registerStandNumbersControl');
  }
  public get registerPasswordControl() {
    return this.registerFormGroup.get('registerPasswordControl');
  }
  public get registerConfirmPasswordControl() {
    return this.registerFormGroup.get('registerConfirmPasswordControl');
  }
  public get registerPasswordResetControl() {
    return this.registerFormGroup.get('registerPasswordResetControl');
  }
  public get loginEmailControl() {
    return this.loginFormGroup.get('loginEmailControl');
  }
  public get loginPasswordControl() {
    return this.loginFormGroup.get('loginPasswordControl');
  }
}
