import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { LoginToken } from 'src/app/models/login-token.model';
import { SubmitGreeningTedderfieldRequest } from 'src/app/models/submit-greening-tedderfield-request.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { TokenService } from 'src/app/services/token/token.service';
import { MembersService } from '../../services/members.service';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';

@Component({
  selector: 'app-green-tedderfield',
  templateUrl: './green-tedderfield.component.html',
  styleUrls: ['./green-tedderfield.component.scss']
})
export class GreenTedderfieldComponent implements OnInit {
  public greeningTedderfieldFormGroup: FormGroup;
  public loggedInUserDetails = new GetUserDataResponse.Data();
  public isHelpUsExpanded = true;
  public isGeeningFormExpanded = true;
  public amountSelectControlData = [
    {
      value: "300",
      displayValue: "R300 [one indigenous tree]"
    },
    {
      value: "1500",
      displayValue: "R1500 [five indigenous trees]"
    },
    {
      value: "3000",
      displayValue: "R3000 [ten indigenous trees]"
    }
  ];

  constructor(private formBuilder: FormBuilder,
    private membersService: MembersService,
    public appModalService: AppModalService,
    public tokenService: TokenService,
    public router: Router) { }

  ngOnInit() {
    this.getUserDetails();
    this.initializeFollowUsControls();
  }

  public getUserDetails() {
    const userDetails = this.tokenService.getUserData() as GetUserDataResponse.Data;
    if (!userDetails) {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'User not logged in', 'You are not logged in. Please log in and try again.', null);
      this.router.navigateByUrl(AppRoutes.Home);
    } else {
      this.loggedInUserDetails = userDetails;
    }
  }

  public initializeFollowUsControls() {
    this.greeningTedderfieldFormGroup = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      donateAmountSelectControl: new FormControl('', [Validators.required]),
      otherIdeasControl: new FormControl(''),
    });

    this.prePopulateData();
  }

  public prePopulateData() {
    if (this.loggedInUserDetails?.name && this.loggedInUserDetails?.surname) {
      this.nameControl.setValue(this.loggedInUserDetails.name + ' ' + this.loggedInUserDetails.surname);
      this.nameControl.disable();
    }else {
      this.nameControl.setValue('');
      this.nameControl.enable();
    }

    if (this.loggedInUserDetails?.email) {
      this.emailControl.setValue(this.loggedInUserDetails.email);
      this.emailControl.disable();
    }else {
      this.emailControl.setValue('');
      this.emailControl.enable();
    }
  }

  public submitClicked() {
    const requestData = new SubmitGreeningTedderfieldRequest.RootObject();
    requestData.name = this.nameControl?.value;
    requestData.email = this.emailControl?.value;
    requestData.donationAmount = this.donateAmountSelectControl?.value;
    requestData.otherIdeas = this.otherIdeasControl?.value;
    requestData.userId = this.loggedInUserDetails.id?.toString();

    this.membersService.submitGreeningTedderfield(requestData).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Greening Tedderfield', results.message, null);
      if (results.status === 200) {
        this.clearFormData();
      }
    });
  }

  public clearFormData() {
    this.nameControl?.setValue('');
    this.nameControl?.reset();
    this.emailControl?.setValue('');
    this.emailControl?.reset();
    this.donateAmountSelectControl?.setValue('');
    this.donateAmountSelectControl?.reset();
    this.otherIdeasControl?.setValue('');
    this.otherIdeasControl?.reset();
    this.prePopulateData();
  }

  public get nameControl() {
    return this.greeningTedderfieldFormGroup.get('nameControl');
  }
  public get emailControl() {
    return this.greeningTedderfieldFormGroup.get('emailControl');
  }
  public get donateAmountSelectControl() {
    return this.greeningTedderfieldFormGroup.get('donateAmountSelectControl');
  }
  public get otherIdeasControl() {
    return this.greeningTedderfieldFormGroup.get('otherIdeasControl');
  }

}
