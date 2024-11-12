import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { LoginToken } from 'src/app/models/login-token.model';
import { SellMyStandRequest } from 'src/app/models/sell-my-stand-request.model';
import { LoginService } from 'src/app/services/login/login.service';
import { MembersService } from '../../services/members.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalTypes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-sell-my-stand',
  templateUrl: './sell-my-stand.component.html',
  styleUrls: ['./sell-my-stand.component.scss']
})
export class SellMyStandComponent implements OnInit {
  public isSellMyStandExpanded = true;
  public isSellMyStandFormExpanded = true;
  public sellMyStandFormGroup: FormGroup;
  public submitStandForSaleRequestData: SellMyStandRequest.RootObject;
  public loggedInUserDetails: LoginToken;
  public submitAdSucessId: number;

  constructor(public formBuilder: FormBuilder,
    public loginService: LoginService,
    public membersService: MembersService,
    public appModalService: AppModalService) { }

  ngOnInit() {
    this.getUserData();
    this.submitStandForSaleRequestData = new SellMyStandRequest.RootObject();
    this.initializeFormControls();
  }

  public getUserData() {
    this.loggedInUserDetails = this.loginService.getLoggedInUserDetails();
  }

  public initializeFormControls() {
    this.sellMyStandFormGroup = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      phoneNumberControl: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
      standNumberControl: new FormControl('', [Validators.required]),
      standDimentionsWidthControl: new FormControl(''),
      standDimentionsLengthControl: new FormControl(''),
      standFeaturesAndBenefitsControl: new FormControl(''),
      standSecurityControl: new FormControl('', [Validators.required]),
      askingPriceControl: new FormControl('', [Validators.required]),
      pilotLevyCheckboxControl: new FormControl(''),
      sectionLevyCheckboxControl: new FormControl(''),
      securityLevyCheckboxControl: new FormControl(''),
      voluntaryUseLevyCheckboxControl: new FormControl(''),
      reasonForSellingControl: new FormControl('', [Validators.required]),
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
  }

  public numberControlInput(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.removeNonNumericCharacters(formControl?.value);
    formControl?.setValue(valueToSet);
  }

  public numberControlInputWithDecimal(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.inputBoxSeparatorWithDecimalsAndCommas(formControl?.value);
    formControl?.setValue(valueToSet);
  }

  public thousandSeparatorControlInput(formControl?: AbstractControl) {
    const valueToSet = AppHelperFunction.includeDecimalsOnInputValue(formControl?.value);
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

  public updateTitleDocumentation(uploadedDocuments: SellMyStandRequest.FileData[]) {
    // Only allow one documents
    if (uploadedDocuments?.length > 0) {
      const uploadedDocument = uploadedDocuments[0];

      if (!this.submitStandForSaleRequestData.titleDocument) {
        this.submitStandForSaleRequestData.titleDocument = new SellMyStandRequest.FileData();
      }

      this.submitStandForSaleRequestData.titleDocument.fileName = uploadedDocument.fileName;
      this.submitStandForSaleRequestData.titleDocument.fileData = uploadedDocument.fileData;
    }
  }

  public deleteTitleDocument() {
    this.submitStandForSaleRequestData.titleDocument = new SellMyStandRequest.FileData();
  }

  public updateStandImages(uploadedImages: SellMyStandRequest.FileData[]) {
    if (uploadedImages?.length > 0) {
      if (uploadedImages.length > 5) {
        uploadedImages.splice(5);
      }

      if (!this.submitStandForSaleRequestData.standImages) {
        this.submitStandForSaleRequestData.standImages = new Array<SellMyStandRequest.FileData>();
      }

      uploadedImages.forEach(image => {
        this.submitStandForSaleRequestData.standImages.push(image);
      });

      if (this.submitStandForSaleRequestData.standImages.length > 5) {
        this.submitStandForSaleRequestData.standImages.splice(0, (this.submitStandForSaleRequestData.standImages.length - 5));
      }
    }
  }

  public deleteStandImage(fileName: string) {
    this.submitStandForSaleRequestData.standImages = this.submitStandForSaleRequestData.standImages.filter(x => x.fileName !== fileName);
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
    this.submitAdSucessId = 0;
    if (!this.submitStandForSaleRequestData) {
      this.submitStandForSaleRequestData = new SellMyStandRequest.RootObject();
    }

    this.submitStandForSaleRequestData.name = this.nameControl.value;
    this.submitStandForSaleRequestData.email = this.emailControl.value;
    this.submitStandForSaleRequestData.phoneNumber = this.phoneNumberControl.value;
    this.submitStandForSaleRequestData.standNumber = this.standNumberControl.value;

    this.submitStandForSaleRequestData.standDimensions = new SellMyStandRequest.StandDimensions();
    this.submitStandForSaleRequestData.standDimensions.width = this.standDimentionsWidthControl.value;
    this.submitStandForSaleRequestData.standDimensions.length = this.standDimentionsLengthControl.value;

    this.submitStandForSaleRequestData.featuresAndBenefits = this.formatBulletPointInputValuesToSubmit(this.standFeaturesAndBenefitsControl.value);
    this.submitStandForSaleRequestData.securty = this.formatBulletPointInputValuesToSubmit(this.standSecurityControl.value);
    this.submitStandForSaleRequestData.price = this.askingPriceControl.value;
    this.submitStandForSaleRequestData.reasonsForSelling = this.reasonForSellingControl.value;

    this.submitStandForSaleRequestData.leviesApplicable = new Array<string>();

    if (this.pilotLevyCheckboxControl.value) {
      this.submitStandForSaleRequestData.leviesApplicable.push('Pilot Levy ZAR770 per month');
    }
    if (this.sectionLevyCheckboxControl.value) {
      this.submitStandForSaleRequestData.leviesApplicable.push('Section Levey ZAR1075 per month');
    }
    if (this.securityLevyCheckboxControl.value) {
      this.submitStandForSaleRequestData.leviesApplicable.push('Security Levy ZAR110 per month');
    }
    if (this.voluntaryUseLevyCheckboxControl.value) {
      this.submitStandForSaleRequestData.leviesApplicable.push('Voluntary Use Levy ZAR1000 per month');
    }


    console.log('DATA TO SUBMIT: ', this.submitStandForSaleRequestData);
    this.membersService.submitSellMyStand(this.submitStandForSaleRequestData).then(results => {
      if (results.status === 200) {
        this.submitAdSucessId = results.id;
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Sell My Stand', 'Your request has been captured successfully.', null);
        this.uploadDocuments();
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Sell My Stand', results.message, null);
      }
    });

  }

  public async uploadDocuments() {
    if (this.submitStandForSaleRequestData.titleDocument?.fileData && this.submitStandForSaleRequestData.titleDocument?.fileName) {
      await this.uploadTitleDocument();
    }
    if (this.submitStandForSaleRequestData.standImages?.length) {
      await this.uploadStandImages();
    }

    this.clearFormData();
  }

  public async uploadTitleDocument() {
    await this.membersService.uploadSellMyStandTitleDocument(this.submitAdSucessId, this.submitStandForSaleRequestData.titleDocument.fileData).then(results => {
      if (results.status === 200) {
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Title Document', results.message, null);
      }
    });
  }

  public async uploadStandImages() {
    this.submitStandForSaleRequestData.standImages.forEach(async (image) => {
      if (image.fileName && image.fileData) {
        await this.membersService.uploadSellMyStandImages(this.submitAdSucessId, image.fileData).then(results => {
          if (results.status === 200) {
          } else {
            this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Floor Plan Docuemtn', results.message, null);
          }
        });
      }
    })
  }

  public clearFormData() {
    this.submitStandForSaleRequestData = new SellMyStandRequest.RootObject();
    this.sellMyStandFormGroup.reset();
    this.prePopulateData();
  }

  public get nameControl() {
    return this.sellMyStandFormGroup.get('nameControl');
  }
  public get emailControl() {
    return this.sellMyStandFormGroup.get('emailControl');
  }
  public get phoneNumberControl() {
    return this.sellMyStandFormGroup.get('phoneNumberControl');
  }
  public get standNumberControl() {
    return this.sellMyStandFormGroup.get('standNumberControl');
  }
  public get standDimentionsWidthControl() {
    return this.sellMyStandFormGroup.get('standDimentionsWidthControl');
  }
  public get standDimentionsLengthControl() {
    return this.sellMyStandFormGroup.get('standDimentionsLengthControl');
  }
  public get standFeaturesAndBenefitsControl() {
    return this.sellMyStandFormGroup.get('standFeaturesAndBenefitsControl');
  }
  public get standSecurityControl() {
    return this.sellMyStandFormGroup.get('standSecurityControl');
  }
  public get askingPriceControl() {
    return this.sellMyStandFormGroup.get('askingPriceControl');
  }
  public get pilotLevyCheckboxControl() {
    return this.sellMyStandFormGroup.get('pilotLevyCheckboxControl');
  }
  public get sectionLevyCheckboxControl() {
    return this.sellMyStandFormGroup.get('sectionLevyCheckboxControl');
  }
  public get securityLevyCheckboxControl() {
    return this.sellMyStandFormGroup.get('securityLevyCheckboxControl');
  }
  public get voluntaryUseLevyCheckboxControl() {
    return this.sellMyStandFormGroup.get('voluntaryUseLevyCheckboxControl');
  }
  public get reasonForSellingControl() {
    return this.sellMyStandFormGroup.get('reasonForSellingControl');
  }

}
