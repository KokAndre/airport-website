import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { LoginToken } from 'src/app/models/login-token.model';
import { SellMyHangerRequest } from 'src/app/models/sell-my-hanger-request.model';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sell-my-hanger',
  templateUrl: './sell-my-hanger.component.html',
  styleUrls: ['./sell-my-hanger.component.scss']
})
export class SellMyHangerComponent implements OnInit {
  public isSellMyHangerExpanded = true;
  public isSellMyHangerFormExpanded = true;
  public sellMyHangerFormGroup: FormGroup;
  public submitHangerForSaleRequestData: SellMyHangerRequest.RootObject;
  public loggedInUserDetails: LoginToken;

  constructor(public formBuilder: FormBuilder, public loginService: LoginService) { }

  ngOnInit() {
    this.getUserData();
    this.submitHangerForSaleRequestData = new SellMyHangerRequest.RootObject();
    this.initializeFormControls();
  }

  public getUserData() {
    this.loggedInUserDetails = this.loginService.getLoggedInUserDetails();
  }

  public initializeFormControls() {
    this.sellMyHangerFormGroup = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      phoneNumberControl: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
      hangerNumberControl: new FormControl('', [Validators.required]),
      hangerDimentionsWidthControl: new FormControl(''),
      hangerDimentionsLengthControl: new FormControl(''),
      hangerDoorTypeSelectControl: new FormControl(''),
      hangerDoorDimensionsWidthControl: new FormControl(''),
      hangerDoorDimensionsLengthControl: new FormControl(''),
      hangerDoorDimensionsHeightControl: new FormControl(''),
      hangerBuildingMaterialControl: new FormControl(''),
      hangerYearBuiltControl: new FormControl('', [Validators.required]),
      hangerCustomisationsControl: new FormControl('', [Validators.required]),
      hangerFeaturesAndBenefitsControl: new FormControl(''),
      hangerSecurityControl: new FormControl('', [Validators.required]),
      hangerAdditionalInfrastucture: new FormControl(''),
      askingPriceControl: new FormControl('', [Validators.required]),
      pilotLevyCheckboxControl: new FormControl(''),
      sectionLevyCheckboxControl: new FormControl(''),
      securityLevyCheckboxControl: new FormControl(''),
      voluntaryUseLevyCheckboxControl: new FormControl(''),
      reasonForSellingControl: new FormControl('', [Validators.required]),
    });

    if (this.loggedInUserDetails.name && this.loggedInUserDetails.surname) {
      this.nameControl.setValue(this.loggedInUserDetails.name + ' ' + this.loggedInUserDetails.surname);
      this.nameControl.disable();
    }

    if (this.loggedInUserDetails.email) {
      this.emailControl.setValue(this.loggedInUserDetails.email);
      this.emailControl.disable();
    }
  }

  public numberControlInput(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.removeNonNumericCharacters(formControl?.value);
    formControl?.setValue(valueToSet);
  }

  public thousandSeparatorControlInput(formControl?: AbstractControl) {
    // TODO: 
    // const valueToSet = AppHelperFunction.removeNonNumericCharacters(formControl?.value);
    // formControl?.setValue(valueToSet);
  }

  public updateTitleDocumentation(uploadedDocuments: SellMyHangerRequest.FileData[]) {
    // Only allow one documents
    if (uploadedDocuments?.length > 0) {
      const uploadedDocument = uploadedDocuments[0];

      if (!this.submitHangerForSaleRequestData.titleDocument) {
        this.submitHangerForSaleRequestData.titleDocument = new SellMyHangerRequest.FileData();
      }

      this.submitHangerForSaleRequestData.titleDocument.fileName = uploadedDocument.fileName;
      this.submitHangerForSaleRequestData.titleDocument.fileData = uploadedDocument.fileData;
    }
  }

  public deleteTitleDocument() {
    this.submitHangerForSaleRequestData.titleDocument = new SellMyHangerRequest.FileData();
  }

  public updateHangerImages(uploadedImages: SellMyHangerRequest.FileData[]) {
    if (uploadedImages?.length > 0) {
      if (uploadedImages.length > 5) {
        uploadedImages.splice(5);
      }

      if (!this.submitHangerForSaleRequestData.hangerImages) {
        this.submitHangerForSaleRequestData.hangerImages = new Array<SellMyHangerRequest.FileData>();
      }

      uploadedImages.forEach(image => {
        this.submitHangerForSaleRequestData.hangerImages.push(image);
      });

      if (this.submitHangerForSaleRequestData.hangerImages.length > 5) {
        this.submitHangerForSaleRequestData.hangerImages.splice(0, (this.submitHangerForSaleRequestData.hangerImages.length - 5));
      }
    }
  }

  public deleteHangerImage(fileName: string) {
    this.submitHangerForSaleRequestData.hangerImages = this.submitHangerForSaleRequestData.hangerImages.filter(x => x.fileName !== fileName);
  }

  public updateFloorDocumentation(uploadedDocuments: SellMyHangerRequest.FileData[]) {
    // Only allow one documents
    if (uploadedDocuments?.length > 0) {
      const uploadedDocument = uploadedDocuments[0];

      if (!this.submitHangerForSaleRequestData.detailedFloorPlan) {
        this.submitHangerForSaleRequestData.detailedFloorPlan = new SellMyHangerRequest.FileData();
      }

      this.submitHangerForSaleRequestData.detailedFloorPlan.fileName = uploadedDocument.fileName;
      this.submitHangerForSaleRequestData.detailedFloorPlan.fileData = uploadedDocument.fileData;
    }
  }

  public deleteFloorPlanDocument() {
    this.submitHangerForSaleRequestData.detailedFloorPlan = new SellMyHangerRequest.FileData();
  }

  public submitClicked() {
    if (!this.submitHangerForSaleRequestData) {
      this.submitHangerForSaleRequestData = new SellMyHangerRequest.RootObject();
    }

    this.submitHangerForSaleRequestData.name = this.nameControl.value;
    this.submitHangerForSaleRequestData.email = this.emailControl.value;
    this.submitHangerForSaleRequestData.phoneNumber = this.phoneNumberControl.value;
    this.submitHangerForSaleRequestData.hangerNumber = this.hangerNumberControl.value;

    this.submitHangerForSaleRequestData.hangerDimensions = new SellMyHangerRequest.HangerDimensions();
    this.submitHangerForSaleRequestData.hangerDimensions.width = this.hangerDimentionsWidthControl.value;
    this.submitHangerForSaleRequestData.hangerDimensions.length = this.hangerDimentionsLengthControl.value;

    this.submitHangerForSaleRequestData.doorType = this.hangerDoorTypeSelectControl.value;

    this.submitHangerForSaleRequestData.doorDimensions = new SellMyHangerRequest.HangerDimensions();
    this.submitHangerForSaleRequestData.doorDimensions.width = this.hangerDoorDimensionsWidthControl.value;
    this.submitHangerForSaleRequestData.doorDimensions.length = this.hangerDoorDimensionsLengthControl.value;
    this.submitHangerForSaleRequestData.doorDimensions.height = this.hangerDoorDimensionsHeightControl.value;

    this.submitHangerForSaleRequestData.buildingMaterial = this.hangerBuildingMaterialControl.value;
    this.submitHangerForSaleRequestData.yearBuilt = this.hangerYearBuiltControl.value;
    this.submitHangerForSaleRequestData.hangerCustomisations = this.hangerCustomisationsControl.value;
    this.submitHangerForSaleRequestData.featuresAndBenefits = this.hangerFeaturesAndBenefitsControl.value;
    this.submitHangerForSaleRequestData.securty = this.hangerSecurityControl.value;
    this.submitHangerForSaleRequestData.additionalInfrastructure = this.hangerAdditionalInfrastucture.value;
    this.submitHangerForSaleRequestData.price = this.askingPriceControl.value;
    this.submitHangerForSaleRequestData.reasonsForSelling = this.reasonForSellingControl.value;
    
    this.submitHangerForSaleRequestData.leviesApplicable = new Array<string>();

    if (this.pilotLevyCheckboxControl.value) {
      this.submitHangerForSaleRequestData.leviesApplicable.push('Pilot Levy ZAR770 per month');
    }
    if (this.sectionLevyCheckboxControl.value) {
      this.submitHangerForSaleRequestData.leviesApplicable.push('Section Levey ZAR1075 per month');
    }
    if (this.securityLevyCheckboxControl.value) {
      this.submitHangerForSaleRequestData.leviesApplicable.push('Security Levy ZAR110 per month');
    }
    if (this.voluntaryUseLevyCheckboxControl.value) {
      this.submitHangerForSaleRequestData.leviesApplicable.push('Voluntary Use Levy ZAR1000 per month');
    }


    console.log('DATA TO SUBMIT: ', this.submitHangerForSaleRequestData);

  }

  public get nameControl() {
    return this.sellMyHangerFormGroup.get('nameControl');
  }
  public get emailControl() {
    return this.sellMyHangerFormGroup.get('emailControl');
  }
  public get phoneNumberControl() {
    return this.sellMyHangerFormGroup.get('phoneNumberControl');
  }
  public get hangerNumberControl() {
    return this.sellMyHangerFormGroup.get('hangerNumberControl');
  }
  public get hangerDimentionsWidthControl() {
    return this.sellMyHangerFormGroup.get('hangerDimentionsWidthControl');
  }
  public get hangerDimentionsLengthControl() {
    return this.sellMyHangerFormGroup.get('hangerDimentionsLengthControl');
  }
  public get hangerDoorTypeSelectControl() {
    return this.sellMyHangerFormGroup.get('hangerDoorTypeSelectControl');
  }
  public get hangerDoorDimensionsWidthControl() {
    return this.sellMyHangerFormGroup.get('hangerDoorDimensionsWidthControl');
  }
  public get hangerDoorDimensionsLengthControl() {
    return this.sellMyHangerFormGroup.get('hangerDoorDimensionsLengthControl');
  }
  public get hangerDoorDimensionsHeightControl() {
    return this.sellMyHangerFormGroup.get('hangerDoorDimensionsHeightControl');
  }
  public get hangerBuildingMaterialControl() {
    return this.sellMyHangerFormGroup.get('hangerBuildingMaterialControl');
  }
  public get hangerYearBuiltControl() {
    return this.sellMyHangerFormGroup.get('hangerYearBuiltControl');
  }
  public get hangerCustomisationsControl() {
    return this.sellMyHangerFormGroup.get('hangerCustomisationsControl');
  }
  public get hangerFeaturesAndBenefitsControl() {
    return this.sellMyHangerFormGroup.get('hangerFeaturesAndBenefitsControl');
  }
  public get hangerSecurityControl() {
    return this.sellMyHangerFormGroup.get('hangerSecurityControl');
  }
  public get hangerAdditionalInfrastucture() {
    return this.sellMyHangerFormGroup.get('hangerAdditionalInfrastucture');
  }
  public get askingPriceControl() {
    return this.sellMyHangerFormGroup.get('askingPriceControl');
  }
  public get pilotLevyCheckboxControl() {
    return this.sellMyHangerFormGroup.get('pilotLevyCheckboxControl');
  }
  public get sectionLevyCheckboxControl() {
    return this.sellMyHangerFormGroup.get('sectionLevyCheckboxControl');
  }
  public get securityLevyCheckboxControl() {
    return this.sellMyHangerFormGroup.get('securityLevyCheckboxControl');
  }
  public get voluntaryUseLevyCheckboxControl() {
    return this.sellMyHangerFormGroup.get('voluntaryUseLevyCheckboxControl');
  }
  public get reasonForSellingControl() {
    return this.sellMyHangerFormGroup.get('reasonForSellingControl');
  }
}
