import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/login-request.model';
import { RegisterRequest } from 'src/app/models/register-request.model';
import { LoginService } from 'src/app/services/login/login.service';
import * as zxcvbn from 'zxcvbn';
import * as CryptoJS from 'crypto-js';
import { EncryptionKeys, SessionStorageKeys } from 'src/app/enums/app.enums';
import { LoginToken } from 'src/app/models/login-token.model';
import * as moment from 'moment';
import { SessionStorageHelper } from 'src/app/helpers/app-helper.functions';

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

  constructor(public formBuilder: FormBuilder, public loginService: LoginService) { }

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
        this.registerConfirmPasswordControl?.disable({ onlySelf: true, emitEvent: false });
        break;
      case 1:
        this.strengthMeterClass = 'progress-bar-25';
        this.passwordStrengthText = 'Too weak';
        this.passwordIsStrong = false;
        this.registerConfirmPasswordControl?.disable({ onlySelf: true, emitEvent: false });
        break;
      case 2:
        this.strengthMeterClass = 'progress-bar-50';
        this.passwordStrengthText = 'Not strong enough';
        this.passwordIsStrong = false;
        this.registerConfirmPasswordControl?.disable({ onlySelf: true, emitEvent: false });
        break;
      case 3:
        this.strengthMeterClass = 'progress-bar-75';
        this.passwordStrengthText = 'Strong';
        this.passwordIsStrong = true;
        this.registerConfirmPasswordControl?.enable({ onlySelf: true, emitEvent: false });
        break;
      case 4:
        this.strengthMeterClass = 'progress-bar-100';
        this.passwordStrengthText = 'Very Strong';
        this.passwordIsStrong = true;
        this.registerConfirmPasswordControl?.enable({ onlySelf: true, emitEvent: false });
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
    console.log('EMAIL: ', this.registerEmailControl?.value);
    console.log('Password: ', this.registerPasswordControl?.value);

    const requestData = new RegisterRequest();
    requestData.name = this.registerNameControl?.value;
    requestData.surname = this.registerSurnameControl?.value;
    requestData.email = this.registerEmailControl?.value;
    requestData.password = CryptoJS.AES.encrypt(this.registerPasswordControl?.value, EncryptionKeys.LoginPasswordEncryptionKey).toString();

    this.loginService.registerNewUser(requestData).then(results => {
      console.log('Register Results: ', results);
    });
  }

  public loginClicked() {
    const requestData = new LoginRequest();
    requestData.email = this.loginEmailControl?.value;
    requestData.password = CryptoJS.AES.encrypt(this.loginPasswordControl?.value, EncryptionKeys.LoginPasswordEncryptionKey).toString();

    console.log('Request for Login: ', requestData);

    const tokenToStore = new LoginToken();
    tokenToStore.name = 'TestName';
    tokenToStore.surname = 'TestSurname';
    tokenToStore.loginDateTime = new Date().toISOString();
    tokenToStore.logoutDateTime = moment(new Date()).add(2, 'm').toISOString();

    console.log('TOKEN: ', tokenToStore);

    const stringToken = JSON.stringify(tokenToStore);

    console.log('STRING TOKEN: ', stringToken);

    const encryptedToken = CryptoJS.AES.encrypt(stringToken, EncryptionKeys.TokenEncryptionKey).toString();

    SessionStorageHelper.storeItem(SessionStorageKeys.Token, encryptedToken);

    // this.loginService.loginUser(requestData).then(results => {
    //   console.log('Login Results: ', results);
    // });
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
