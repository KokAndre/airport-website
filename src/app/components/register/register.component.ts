import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerFormGroup: FormGroup;
  public hideNewPin = true;
  public strengthText = 'Password strength:';
  public showStrength = false;
  public passwordScore = 0;
  public passwordStrengthText: string;
  public strengthMeterClass: string;
  public passwordIsStrong = false;
  public disableSaveButton = true;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeControls();
  }

  public initializeControls() {
    console.log('INITIALIZE CONTROLS');
    this.registerFormGroup = this.formBuilder.group({
      registerNameControl: new FormControl('', [Validators.required]),
      registerSurnameControl: new FormControl('', [Validators.required]),
      registerEmailControl: new FormControl('', [Validators.required]),
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
    this.registerConfirmPasswordControl?.disable({ onlySelf: true, emitEvent: false });
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

    // // only enable cancel button when there is data to clear.
    // if (this.registerPasswordControl?.value.length > 0 || this.registerConfirmPasswordControl?.value.length > 0 || !this.registerPasswordControl?.pristine) {
    //   this.setCancelButton(true);
    // }

  }

  public getPasswordStrength(password: string) {
    const passwordResult = zxcvbn(password);
    return passwordResult.score;
  }

  public registerClicked() {
    console.log('EMAIL: ', this.registerEmailControl?.value);
    console.log('Password: ', this.registerPasswordControl?.value);
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
}
