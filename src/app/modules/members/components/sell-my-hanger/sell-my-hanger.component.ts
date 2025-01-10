import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { LoginToken } from 'src/app/models/login-token.model';
import { SellMyHangerRequest } from 'src/app/models/sell-my-hanger-request.model';
import { LoginService } from 'src/app/services/login/login.service';
import { MembersService } from '../../services/members.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalTypes } from 'src/app/enums/app.enums';
// import { GetLeviesResponse } from 'src/app/models/get-levies-response.model';

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
  public submitAdSucessId: number;
  // public leviesData = new Array<GetLeviesResponse.Levie>();

  constructor(public formBuilder: FormBuilder, public loginService: LoginService, public membersService: MembersService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getUserData();
    // this.getLeviesData();
    this.submitHangerForSaleRequestData = new SellMyHangerRequest.RootObject();
    this.initializeFormControls();
  }

  public getUserData() {
    this.loggedInUserDetails = this.loginService.getLoggedInUserDetails();
  }

  // public getLeviesData() {
  //   this.membersService.getLeviesData().then(results => {
  //     if (results.status === 200) {
  //       this.leviesData = results.levies;
  //       this.leviesData?.forEach(levie => {
  //         // levie.isForHangars = levie.isForHangars === '1' ? true : false;
  //         levie.isSelected = false;
  //       });
  //     } else {
  //       // Add one levie by default:
  //       const defaultLevieToAdd = new GetLeviesResponse.Levie();
  //       defaultLevieToAdd.levieName = 'Security Levy';
  //       defaultLevieToAdd.leviePrice = '110'
  //       defaultLevieToAdd.levieFrequency = 'month'
  //       defaultLevieToAdd.isForHangars = '1';
  //       defaultLevieToAdd.isForStands = '1';
  //       defaultLevieToAdd.isSelected = false;
  //       defaultLevieToAdd.id = 1

  //       this.leviesData = new Array<GetLeviesResponse.Levie>();
  //       this.leviesData.push(defaultLevieToAdd);
  //     }
  //   });
  // }

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
      // pilotLevyCheckboxControl: new FormControl(''),
      // sectionLevyCheckboxControl: new FormControl(''),
      // securityLevyCheckboxControl: new FormControl(''),
      // voluntaryUseLevyCheckboxControl: new FormControl(''),
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

    if (this.loggedInUserDetails?.phoneNumber) {
      this.phoneNumberControl.setValue(this.loggedInUserDetails.phoneNumber);
      this.phoneNumberControl.disable();
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
    }
  }

  // public updateTitleDocumentation(uploadedDocuments: SellMyHangerRequest.FileData[]) {
  //   // Only allow one documents
  //   if (uploadedDocuments?.length > 0) {
  //     const uploadedDocument = uploadedDocuments[0];

  //     if (!this.submitHangerForSaleRequestData.titleDocument) {
  //       this.submitHangerForSaleRequestData.titleDocument = new SellMyHangerRequest.FileData();
  //     }

  //     if (uploadedDocument.fileName && uploadedDocument.fileData) {
  //       this.submitHangerForSaleRequestData.titleDocument.fileName = uploadedDocument.fileName;
  //       this.submitHangerForSaleRequestData.titleDocument.fileData = uploadedDocument.fileData;
  //     }

  //   }
  // }

  // public deleteTitleDocument() {
  //   this.submitHangerForSaleRequestData.titleDocument = new SellMyHangerRequest.FileData();
  // }

  public updateHangerImages(uploadedImages: SellMyHangerRequest.FileData[]) {
    if (uploadedImages?.length > 0) {
      if (uploadedImages.length > 5) {
        uploadedImages = uploadedImages.splice(4);
      }

      if (!this.submitHangerForSaleRequestData.hangerImages) {
        this.submitHangerForSaleRequestData.hangerImages = new Array<SellMyHangerRequest.FileData>();
      }

      uploadedImages.forEach(image => {

        if (image.fileName && image.fileData) {
          this.submitHangerForSaleRequestData.hangerImages.push(image);
        }
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


      if (uploadedDocument.fileName && uploadedDocument.fileData) {
        this.submitHangerForSaleRequestData.detailedFloorPlan.fileName = uploadedDocument.fileName;
        this.submitHangerForSaleRequestData.detailedFloorPlan.fileData = uploadedDocument.fileData;
      }
    }
  }

  public deleteFloorPlanDocument() {
    this.submitHangerForSaleRequestData.detailedFloorPlan = new SellMyHangerRequest.FileData();
  }

  public formatBulletPointInputValuesToSubmit(valueToFormat: string) {
    let arrayOfInputValue = valueToFormat.split('\n');
    arrayOfInputValue = arrayOfInputValue.map(line => {
      line = line.replace('•', '');
      line = line.trim();
      line = line.replace("'", "`")
      return line;
    });
    arrayOfInputValue = arrayOfInputValue.filter(x => x !== '');

    return arrayOfInputValue;
  }

  public isSubmitDisabled() {
    if (this.sellMyHangerFormGroup.invalid || !this.submitHangerForSaleRequestData.hangerImages?.length) {
      return true;
    }

    // const isLeviesItemSelected = this.leviesData.filter(x => x.isSelected);
    // if (!isLeviesItemSelected?.length) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  public submitClicked() {
    this.submitAdSucessId = 0;
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

    this.submitHangerForSaleRequestData.buildingMaterial = this.formatBulletPointInputValuesToSubmit(this.hangerBuildingMaterialControl.value);

    this.submitHangerForSaleRequestData.yearBuilt = this.hangerYearBuiltControl.value;
    this.submitHangerForSaleRequestData.hangerCustomisations = this.formatBulletPointInputValuesToSubmit(this.hangerCustomisationsControl.value);
    this.submitHangerForSaleRequestData.featuresAndBenefits = this.formatBulletPointInputValuesToSubmit(this.hangerFeaturesAndBenefitsControl.value);
    this.submitHangerForSaleRequestData.securty = this.formatBulletPointInputValuesToSubmit(this.hangerSecurityControl.value);
    this.submitHangerForSaleRequestData.additionalInfrastructure = this.formatBulletPointInputValuesToSubmit(this.hangerAdditionalInfrastucture.value);
    this.submitHangerForSaleRequestData.price = this.askingPriceControl.value;
    this.submitHangerForSaleRequestData.reasonsForSelling = this.reasonForSellingControl.value;

    // this.submitHangerForSaleRequestData.leviesApplicable = new Array<string>();

    // this.leviesData.forEach(levieItem => {
    //   if (levieItem.isSelected) {
    //     const levieItemToPush = `${levieItem.levieName} ZAR${levieItem.leviePrice} per ${levieItem.levieFrequency}`;
    //     this.submitHangerForSaleRequestData.leviesApplicable.push(levieItemToPush);
    //   }
    // });

    this.membersService.submitSellMyHanger(this.submitHangerForSaleRequestData).then(results => {
      if (results.status === 200) {
        this.submitAdSucessId = results.id;
        this.uploadDocuments();
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Sell My Hanger', 'Your request has been captured successfully.', null);
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Sell My Hanger', results.message, null);
      }
    });
  }

  public async uploadDocuments() {
    // if (this.submitHangerForSaleRequestData.titleDocument?.fileData && this.submitHangerForSaleRequestData.titleDocument?.fileName) {
    //   await this.uploadTitleDocument();
    // }
    if (this.submitHangerForSaleRequestData.detailedFloorPlan?.fileData && this.submitHangerForSaleRequestData.detailedFloorPlan?.fileName) {
      await this.uploadFloorPlanDocument();
    }
    if (this.submitHangerForSaleRequestData.hangerImages?.length) {
      await this.uploadHangerImages();
    }

    this.clearFormData();
  }

  // public async uploadTitleDocument() {
  //   await this.membersService.uploadSellMyHangerTitleDocument(this.submitAdSucessId, this.submitHangerForSaleRequestData.titleDocument.fileData).then(results => {
  //     if (results.status === 200) {
  //     } else {
  //       this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Title Document', results.message, null);
  //     }
  //   });
  // }

  public async uploadFloorPlanDocument() {
    await this.membersService.uploadSellMyHangerFloorPlanDocument(this.submitAdSucessId, this.submitHangerForSaleRequestData.detailedFloorPlan.fileData).then(results => {
      if (results.status === 200) {
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Floor Plan Document', results.message, null);
      }
    });
  }

  public async uploadHangerImages() {
    this.submitHangerForSaleRequestData.hangerImages.forEach(async (image) => {
      if (image.fileName && image.fileData) {
        await this.membersService.uploadSellMyHangerImages(this.submitAdSucessId, image.fileData).then(results => {
          if (results.status === 200) {
          } else {
            this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Floor Plan Document', results.message, null);
          }
        });
      }
    });
  }

  public clearFormData() {
    this.submitHangerForSaleRequestData = new SellMyHangerRequest.RootObject();
    this.sellMyHangerFormGroup.reset();
    this.prePopulateData();
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
  // public get pilotLevyCheckboxControl() {
  //   return this.sellMyHangerFormGroup.get('pilotLevyCheckboxControl');
  // }
  // public get sectionLevyCheckboxControl() {
  //   return this.sellMyHangerFormGroup.get('sectionLevyCheckboxControl');
  // }
  // public get securityLevyCheckboxControl() {
  //   return this.sellMyHangerFormGroup.get('securityLevyCheckboxControl');
  // }
  // public get voluntaryUseLevyCheckboxControl() {
  //   return this.sellMyHangerFormGroup.get('voluntaryUseLevyCheckboxControl');
  // }
  public get reasonForSellingControl() {
    return this.sellMyHangerFormGroup.get('reasonForSellingControl');
  }
}
