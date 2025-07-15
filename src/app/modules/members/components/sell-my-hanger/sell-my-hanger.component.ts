import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { GetLeviesResponse } from 'src/app/models/get-levies-response.model';
import { LoginToken } from 'src/app/models/login-token.model';
import { SellMyHangerRequest } from 'src/app/models/sell-my-hanger-request.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { TokenService } from 'src/app/services/token/token.service';
import { MembersService } from '../../services/members.service';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';
import { GetHangersForSaleReponse } from 'src/app/models/get-hangers-for-sale-reponse.model';

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
  public loggedInUserDetails: GetUserDataResponse.Data;
  public submitAdSucessId: number;
  public leviesData = new Array<GetLeviesResponse.Levie>();
  public isPersonalDetailsAcknowledgementCheckboxChecked = false;

  @Input() public originalHangarData: GetHangersForSaleReponse.Hanger;
  @Output() public updateHangarDataEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(public formBuilder: FormBuilder, public tokenService: TokenService, public membersService: MembersService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getUserData();
    this.getLeviesData();
    this.submitHangerForSaleRequestData = new SellMyHangerRequest.RootObject();
    this.initializeFormControls();
  }

  public getUserData() {
    this.loggedInUserDetails = this.tokenService.getUserData() as GetUserDataResponse.Data;
  }

  public getLeviesData() {
    this.membersService.getLeviesData().then(results => {
      if (results.status === 200) {
        this.leviesData = results.levies;
        this.leviesData?.forEach(levie => {
          // levie.isForHangars = levie.isForHangars === '1' ? true : false;
          levie.isSelected = false;
        });
      } else {
        // Add one levie by default:
        const defaultLevieToAdd = new GetLeviesResponse.Levie();
        defaultLevieToAdd.levieName = 'Security Levy';
        defaultLevieToAdd.leviePrice = '110'
        defaultLevieToAdd.levieFrequency = 'month'
        defaultLevieToAdd.isForHangars = '1';
        defaultLevieToAdd.isForStands = '1';
        defaultLevieToAdd.isSelected = false;
        defaultLevieToAdd.id = 1

        this.leviesData = new Array<GetLeviesResponse.Levie>();
        this.leviesData.push(defaultLevieToAdd);
      }

      if (this.originalHangarData?.id) {
        this.prePopulateExistingData();
      }
    });
  }

  public initializeFormControls() {
    this.sellMyHangerFormGroup = this.formBuilder.group({
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      phoneNumberControl: new FormControl('', [Validators.maxLength(10), Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
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
      // if (this.loggedInUserDetails.email !== 'grounds@tedderfield.co.za') {
      this.nameControl.disable();
      // }
    }

    if (this.loggedInUserDetails?.email) {
      this.emailControl.setValue(this.loggedInUserDetails.email);
      // if (this.loggedInUserDetails.email !== 'grounds@tedderfield.co.za') {
      this.emailControl.disable();
      // }
    }

    if (this.loggedInUserDetails?.phoneNumber) {
      this.phoneNumberControl.setValue(this.loggedInUserDetails.phoneNumber);
      // if (this.loggedInUserDetails.email !== 'grounds@tedderfield.co.za') {
      //   this.phoneNumberControl.disable();
      // }
    }

    this.isPersonalDetailsAcknowledgementCheckboxChecked = false;
  }

  public prePopulateExistingData() {
    this.nameControl.setValue(this.originalHangarData.name || '');
    this.emailControl.setValue(this.originalHangarData.email || '');
    this.phoneNumberControl.setValue(this.originalHangarData.phoneNumber || '');
    this.hangerNumberControl.setValue(this.originalHangarData.hangerNumber || '');
    this.hangerDimentionsWidthControl.setValue(this.originalHangarData.hangerDimensions.width || '');
    this.hangerDimentionsLengthControl.setValue(this.originalHangarData.hangerDimensions.length || '');
    this.hangerDoorTypeSelectControl.setValue(this.originalHangarData.doorType || '');
    this.hangerDoorDimensionsWidthControl.setValue(this.originalHangarData.doorDimensions.width || '');
    this.hangerDoorDimensionsLengthControl.setValue(this.originalHangarData.doorDimensions.length || '');
    this.hangerDoorDimensionsHeightControl.setValue(this.originalHangarData.doorDimensions.height || '');
    this.hangerYearBuiltControl.setValue(this.originalHangarData.yearBuilt || '');
    this.askingPriceControl.setValue(this.originalHangarData.price || '');
    this.reasonForSellingControl.setValue(this.originalHangarData.reasonsForSelling);

    this.hangerBuildingMaterialControl.setValue(AppHelperFunction.formatBulletPointInputDataForPrePopulation(this.originalHangarData.buildingMaterial) || '');
    this.hangerCustomisationsControl.setValue(AppHelperFunction.formatBulletPointInputDataForPrePopulation(this.originalHangarData.hangerCustomisations) || '');
    this.hangerFeaturesAndBenefitsControl.setValue(AppHelperFunction.formatBulletPointInputDataForPrePopulation(this.originalHangarData.featuresAndBenefits) || '');
    this.hangerSecurityControl.setValue(AppHelperFunction.formatBulletPointInputDataForPrePopulation(this.originalHangarData.securty) || '');
    this.hangerAdditionalInfrastucture.setValue(AppHelperFunction.formatBulletPointInputDataForPrePopulation(this.originalHangarData.additionalInfrastructure) || '');

    this.submitHangerForSaleRequestData.hangerImages = new Array<SellMyHangerRequest.FileData>();
    this.originalHangarData.hangerImages.forEach(imgData => {
      this.submitHangerForSaleRequestData.hangerImages.push(imgData);
    });

    this.submitHangerForSaleRequestData.titleDocument = new SellMyHangerRequest.FileData();
    this.submitHangerForSaleRequestData.titleDocument = this.originalHangarData.titleDocument;

    this.originalHangarData.leviesApplicable.forEach(levy => {
      const levyName = levy.split('Levy')[0];
      if (this.leviesData.find(levyItem => levyItem.levieName.includes(levyName))) {
        this.leviesData.find(levyItem => levyItem.levieName.includes(levyName)).isSelected = true;
      }
    });
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
      if (numOfLines <= 20) {
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
    }
  }

  public updateTitleDocumentation(uploadedDocuments: SellMyHangerRequest.FileData[]) {
    // Only allow one documents
    if (uploadedDocuments?.length > 0) {
      const uploadedDocument = uploadedDocuments[0];

      if (!this.submitHangerForSaleRequestData.titleDocument) {
        this.submitHangerForSaleRequestData.titleDocument = new SellMyHangerRequest.FileData();
      }

      if (uploadedDocument.fileName && uploadedDocument.fileData) {
        this.submitHangerForSaleRequestData.titleDocument.fileName = uploadedDocument.fileName;
        this.submitHangerForSaleRequestData.titleDocument.fileData = uploadedDocument.fileData;
      }

    }
  }

  public deleteTitleDocument() {
    this.submitHangerForSaleRequestData.titleDocument = new SellMyHangerRequest.FileData();
  }

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
      line = line.replaceAll('•', '');
      line = line.trim();
      line = line.replaceAll("'", '’');
      return line;
    });
    arrayOfInputValue = arrayOfInputValue.filter(x => x !== '');

    return arrayOfInputValue;
  }

  public isSubmitDisabled() {
    if (this.sellMyHangerFormGroup.invalid || !this.submitHangerForSaleRequestData.hangerImages?.length || !this.isPersonalDetailsAcknowledgementCheckboxChecked) {
      return true;
    }

    const isLeviesItemSelected = this.leviesData.filter(x => x.isSelected);
    if (!isLeviesItemSelected?.length) {
      return true;
    } else {
      return false;
    }
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
    this.submitHangerForSaleRequestData.reasonsForSelling = this.reasonForSellingControl.value?.replaceAll("'", '’');

    this.submitHangerForSaleRequestData.leviesApplicable = new Array<string>();

    this.leviesData.forEach(levieItem => {
      if (levieItem.isSelected) {
        const levieItemToPush = `${levieItem.levieName} ZAR${levieItem.leviePrice} per ${levieItem.levieFrequency}`;
        this.submitHangerForSaleRequestData.leviesApplicable.push(levieItemToPush);
      }
    });

    if (this.originalHangarData?.id) {
      this.submitHangerForSaleRequestData.id = this.originalHangarData.id;
      this.updateItem();
    } else {
      this.submitNewItem();
    }
  }

  public submitNewItem() {
    this.membersService.submitSellMyHanger(this.submitHangerForSaleRequestData).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Sell My Hanger', results.message, null);
      if (results.status === 200) {
        this.submitAdSucessId = results.id;
        this.uploadDocuments();
      }
    });
  }

  public updateItem() {
    this.membersService.submitUpdateMyHanger(this.submitHangerForSaleRequestData).then(results => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Sell My Hanger', results.message, null);
      if (results.status === 200) {
        this.submitAdSucessId = results.id;
        this.uploadDocuments();
      }
    });
  }

  public async uploadDocuments() {
    if (this.submitHangerForSaleRequestData.titleDocument?.fileData && this.submitHangerForSaleRequestData.titleDocument?.fileName) {
      if (!this.submitHangerForSaleRequestData?.id || (this.submitHangerForSaleRequestData.id && this.submitHangerForSaleRequestData.titleDocument?.fileName !== this.originalHangarData?.titleDocument?.fileName)) {
        await this.uploadTitleDocument();
      }
    }
    if (this.submitHangerForSaleRequestData.detailedFloorPlan?.fileData && this.submitHangerForSaleRequestData.detailedFloorPlan?.fileName) {
      if (!this.submitHangerForSaleRequestData?.id || (this.submitHangerForSaleRequestData.id && this.submitHangerForSaleRequestData.detailedFloorPlan?.fileName !== this.originalHangarData?.detailedFloorPlan?.fileName)) {
        await this.uploadFloorPlanDocument();
      }
    }
    if (this.submitHangerForSaleRequestData.hangerImages?.length) {
      await this.uploadHangerImages();
    }

    this.clearFormData();

    if (this.submitHangerForSaleRequestData.id) {
      this.updateHangarDataEmit.emit();
    }
  }

  public async uploadTitleDocument() {
    await this.membersService.uploadSellMyHangerTitleDocument(this.submitAdSucessId, this.submitHangerForSaleRequestData.titleDocument.fileData).then(results => {
      if (results.status === 200) {
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Title Document', results.message, null);
      }
    });
  }

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

        if (!this.submitHangerForSaleRequestData?.id || (this.submitHangerForSaleRequestData.id && !this.originalHangarData?.hangerImages?.find(x => x.fileName === image.fileName))) {
          await this.membersService.uploadSellMyHangerImages(this.submitAdSucessId, image.fileData).then(results => {
            if (results.status === 200) {
            } else {
              this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Upload Floor Plan Document', results.message, null);
            }
          });
        }
      }
    });
  }

  public clearFormData() {
    if (!this.originalHangarData?.id) {
      this.submitHangerForSaleRequestData = new SellMyHangerRequest.RootObject();
    }
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
