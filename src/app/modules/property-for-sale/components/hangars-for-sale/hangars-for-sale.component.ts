import { Component, OnInit } from '@angular/core';
import { PropertyForSaleService } from '../../services/property-for-sale.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { Endpoints, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetHangersForSaleReponse } from 'src/app/models/get-hangers-for-sale-reponse.model';
import { SubmitInterestedInPropertyRequest } from 'src/app/models/submit-interested-in-property-request.model';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';

@Component({
  selector: 'app-hangars-for-sale',
  templateUrl: './hangars-for-sale.component.html',
  styleUrls: ['./hangars-for-sale.component.scss']
})
export class HangarsForSaleComponent implements OnInit {
  public isAviationMeetsCommunityExpanded = true;
  public isWhyInvestInAHangerExpanded = true;
  public isDontMissOutOnLimitedHangersExpanded = true;
  public isHangersForSaleAdvertsExpanded = true;
  public hangersForSaleData = new Array<GetHangersForSaleReponse.Hanger>();
  public displayHangerDetails = false;
  public hangerDetailsToDisplay: GetHangersForSaleReponse.Hanger;

  constructor(public propertyForSaleService: PropertyForSaleService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getHangerForSaleData();
  }

  public getHangerForSaleData() {
    this.propertyForSaleService.getHangerForSaleData().then(results => {
      if (results.status === 200) {
        if (results.hangers) {
          this.formatData(results.hangers);
        }
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Hangers for Sale', results.message, null);
      }
    });
  }
  public formatData(results: any) {
    this.hangersForSaleData = new Array<GetHangersForSaleReponse.Hanger>();
    results.forEach(hangerItem => {
      const itemToPush = new GetHangersForSaleReponse.Hanger();
      itemToPush.isExpanded = true;
      itemToPush.id = hangerItem.id;
      itemToPush.name = hangerItem.name;
      itemToPush.email = hangerItem.email;
      itemToPush.phoneNumber = hangerItem.phoneNumber;
      itemToPush.hangerNumber = hangerItem.hangerNumber;
      itemToPush.price = hangerItem.price;
      itemToPush.reasonsForSelling = hangerItem.reasonsForSelling;
      itemToPush.doorType = hangerItem.doorType;
      itemToPush.yearBuilt = hangerItem.yearBuilt;

      itemToPush.titleDocument = new GetHangersForSaleReponse.FileData();
      itemToPush.titleDocument.fileName = hangerItem.titleDocument;
      itemToPush.titleDocument.fileData = Endpoints.HangersForSaleBaseURL + itemToPush.id + '/title-document/' + hangerItem.titleDocument;

      itemToPush.detailedFloorPlan = new GetHangersForSaleReponse.FileData();
      itemToPush.detailedFloorPlan.fileName = hangerItem.detailedFloorPlan;
      itemToPush.detailedFloorPlan.fileData = Endpoints.HangersForSaleBaseURL + itemToPush.id + '/floor-plan-document/' + hangerItem.titleDocument;

      const imageDataArray = hangerItem.hangerImages.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');

      itemToPush.hangerImages = new Array<GetHangersForSaleReponse.FileData>();
      imageDataArray.forEach(img => {
        const hangerImageURL = Endpoints.HangersForSaleBaseURL + itemToPush.id + '/images/' + img;
        itemToPush.hangerImages.push({ fileName: img, fileData: hangerImageURL });
      });

      itemToPush.hangerDimensions = JSON.parse(hangerItem.hangerDimensions ? hangerItem.hangerDimensions.replaceAll('\\', '') : {});
      itemToPush.doorDimensions = JSON.parse(hangerItem.doorDimensions ? hangerItem.doorDimensions.replaceAll('\\', '') : {});

      itemToPush.buildingMaterial = AppHelperFunction.splitStringToArray(hangerItem.buildingMaterial);
      itemToPush.hangerCustomisations = AppHelperFunction.splitStringToArray(hangerItem.hangerCustomisations);
      itemToPush.featuresAndBenefits = AppHelperFunction.splitStringToArray(hangerItem.featuresAndBenefits);
      itemToPush.securty = AppHelperFunction.splitStringToArray(hangerItem.securty);
      itemToPush.additionalInfrastructure = AppHelperFunction.splitStringToArray(hangerItem.additionalInfrastructure);
      itemToPush.leviesApplicable = AppHelperFunction.splitStringToArray(hangerItem.leviesApplicable);

      this.hangersForSaleData.push(itemToPush);
    });
  }

  public togglePannel(indexToToggle: number) {
    this.hangersForSaleData[indexToToggle].isExpanded = !this.hangersForSaleData[indexToToggle].isExpanded;
  }

  public viewHangerDetails(hangerItemId: number) {
    // this.hangerDetailsToDisplay = null;
    this.hangerDetailsToDisplay = this.hangersForSaleData.find(x => x.id === hangerItemId);
    if (this.hangerDetailsToDisplay) {
      document.getElementById('content-container').scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth'
 });
      this.displayHangerDetails = true;
    }
  }

  public backClicked() {
    this.displayHangerDetails = false;
    this.hangerDetailsToDisplay = null;
  }

  public openTitleDocument(fileDisplayName: string, handerId: number) {
    this.propertyForSaleService.getHangerForSaleTitleDocument(handerId).then((results: any) => {
      if (results.status === 200 && results.documentData) {
        const urlForModal = 'data:application/pdf;base64,' + results.documentData.file;
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, fileDisplayName, urlForModal, { removeDownloadButton: true });
      }
    });

  }

  public openFloorPlanDocument(fileDisplayName: string, handerId: number) {
    this.propertyForSaleService.getHangerForSaleFloorPlanDocument(handerId).then((results: any) => {
      if (results.status === 200 && results.documentData) {
        const urlForModal = 'data:application/pdf;base64,' + results.documentData.file;
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, fileDisplayName, urlForModal, { removeDownloadButton: true });
      }
    });
  }

  public displayInterestedInHangerModal() {
    this.appModalService.ShowConfirmationModal(ModalTypes.InterestedInPropertyModal, 'Capture your details', '', null, this.submitInterestedInBuyingHanger.bind(this))
  }

  public submitInterestedInBuyingHanger(modalOutcome: string, requestData: SubmitInterestedInPropertyRequest) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      requestData.propertyId = this.hangerDetailsToDisplay.id;
      this.propertyForSaleService.submitInterestedInHangerData(requestData).then((results: any) => {
        // if (results.status === 200 && results.documentData) {
        this.appModalService.CloseModal();
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Submit interest in hanger', results.message, null);
        // }
      });
    }
  }

}
