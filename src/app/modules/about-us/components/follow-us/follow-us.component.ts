import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { FollowUsRequest } from 'src/app/models/follow-us-request.model';

@Component({
  selector: 'app-follow-us',
  templateUrl: './follow-us.component.html',
  styleUrls: ['./follow-us.component.scss']
})
export class FollowUsComponent implements OnInit {
  public followUsFormGroup: FormGroup;
  public appHelperFunctions = AppHelperFunction;
  // public followUsRequestData: FollowUsRequest.RootObject;
  public interestsData = [
    {
      value: "purchaseHangerOrStand",
      displayValue: "Purchasing a hangar or stand"
    },
    {
      value: "flyingEvents",
      displayValue: "Flying events or airfield activities"
    },
    {
      value: "aviationServices",
      displayValue: "Aviation services (aircraft maintenance, aircraft sales, pilot training, etc.)"
    },
    {
      value: "other",
      displayValue: "Other"
    }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeFollowUsControls();
  }

  public initializeFollowUsControls() {
    this.followUsFormGroup = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      phoneNumberControl: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
      interestsSelectControl: new FormControl('', [Validators.required]),
      otherInterestsControl: new FormControl('', [Validators.required]),
      commentsControl: new FormControl(''),
    });
  }

  public isSubmitButtonDisabled() {
    if (this.nameControl?.invalid || this.emailControl?.invalid || this.phoneNumberControl?.invalid || this.interestsSelectControl?.invalid) {
      return true;
    }

    if (this.interestsSelectControl?.value === 'other' && this.otherInterestsControl?.invalid) {
      return true;
    }

    return false;
  }

  public numberControlInput() {
    const valueToSet = AppHelperFunction.removeNonNumericCharacters(this.phoneNumberControl?.value);
    this.phoneNumberControl?.setValue(valueToSet);
  }

  public submitClicked() {
    const requestData = new FollowUsRequest.RootObject();
    requestData.name = this.nameControl?.value;
    requestData.email = this.emailControl?.value;
    requestData.phoneNumber = this.phoneNumberControl?.value;
    requestData.commentsAndQuestions = this.commentsControl?.value;

    if (this.interestsSelectControl?.value === 'other') {
      requestData.otherInterest = this.otherInterestsControl?.value;
    }

    const interestedInValue = this.interestsData.find(x => x.value === this.interestsSelectControl?.value);
    if (interestedInValue?.displayValue) { 
      requestData.interestedIn = interestedInValue.displayValue;
    }

    console.log('REQUEST DATA: ', requestData);
  }

  public get nameControl() {
    return this.followUsFormGroup.get('nameControl');
  }
  public get emailControl() {
    return this.followUsFormGroup.get('emailControl');
  }
  public get phoneNumberControl() {
    return this.followUsFormGroup.get('phoneNumberControl');
  }
  public get interestsSelectControl() {
    return this.followUsFormGroup.get('interestsSelectControl');
  }
  public get otherInterestsControl() {
    return this.followUsFormGroup.get('otherInterestsControl');
  }
  public get commentsControl() {
    return this.followUsFormGroup.get('commentsControl');
  }

}
