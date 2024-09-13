import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
  public disableSaveButton = true;
  public isLoginButtonFocused = false;
  public isRegisterButtonFocused = false;

  constructor(public formBuilder: FormBuilder, public loginService: LoginService, public router: Router, public appModalService: AppModalService) { }

  ngOnInit() {
    this.initializeControls();
  }

  public initializeControls() {
    console.log('INITIALIZE CONTROLS');
    this.registerFormGroup = this.formBuilder.group({
      registerNameControl: new FormControl('', [Validators.required]),
      registerSurnameControl: new FormControl('', [Validators.required]),
      registerEmailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      registerPasswordControl: new FormControl('', [Validators.required]),
      registerConfirmPasswordControl: new FormControl('', [Validators.required]),
    });

    this.loginFormGroup = this.formBuilder.group({
      loginEmailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      loginPasswordControl: new FormControl('', [Validators.required]),
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

    this.checkOnEnterButtonFocus();
  }

  public checkOnEnterButtonFocus() {
    this.loginFormGroup.valueChanges.subscribe(() => {
      this.isLoginButtonFocused = true;
      this.isRegisterButtonFocused = false;
    });

    this.registerFormGroup.valueChanges.subscribe(() => {
      this.isLoginButtonFocused = false;
      this.isRegisterButtonFocused = true;
    });
  }

  passwordLogicHandling() {
    this.disableSaveButton = true;
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

    if (this.passwordScore >= 3 && this.registerPasswordControl?.value === this.registerConfirmPasswordControl?.value) {
      this.disableSaveButton = false;
    }
  }

  public getPasswordStrength(password: string) {
    const passwordResult = zxcvbn(password);
    return passwordResult.score;
  }

  public registerClicked() {
    const requestData = new RegisterRequest();
    requestData.name = this.registerNameControl?.value;
    requestData.surname = this.registerSurnameControl?.value;
    requestData.email = this.registerEmailControl?.value;
    requestData.password = AppHelperFunction.encryptPassword(this.registerPasswordControl?.value);

    this.loginService.registerNewUser(requestData).then(results => {
      console.log('Register Results: ', results);
      if (results.status === 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Register', 'You have successfully registered.', null);
        this.navigateToHomePage();
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Register', results.message, null);
      }
    });
  }

  public loginClicked() {
    const requestData = new LoginRequest();
    requestData.email = this.loginEmailControl?.value;
    requestData.password = AppHelperFunction.encryptPassword(this.loginPasswordControl?.value);

    console.log('Request for Login: ', requestData);

    this.loginService.loginUser(requestData).then(results => {
      console.log('Login Results: ', results);
      if (results.status === 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Login', 'You have successfully logged in.', null);
        this.navigateToHomePage();
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Login', results.message, null);
      }
    });
  }

  public navigateToHomePage() {
    this.router.navigateByUrl(AppRoutes.Welcome);
  }

  public displayTermsAndConditions() {
    this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, 'Website Terms and Conditions  ', 'assets/documents/FATA-Websites-Terms-and-Conditions.pdf', null);
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
  public get registerPasswordControl() {
    return this.registerFormGroup.get('registerPasswordControl');
  }
  public get registerConfirmPasswordControl() {
    return this.registerFormGroup.get('registerConfirmPasswordControl');
  }
  public get loginEmailControl() {
    return this.loginFormGroup.get('loginEmailControl');
  }
  public get loginPasswordControl() {
    return this.loginFormGroup.get('loginPasswordControl');
  }
}
