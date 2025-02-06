import { Component, OnInit } from '@angular/core';
import { GetStandsForSaleReponse } from 'src/app/models/get-stands-for-sale-reponse.model';
import { PropertyForSaleService } from '../../services/property-for-sale.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { Endpoints, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { SubmitInterestedInPropertyRequest } from 'src/app/models/submit-interested-in-property-request.model';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';

@Component({
  selector: 'app-stands-for-sale',
  templateUrl: './stands-for-sale.component.html',
  styleUrls: ['./stands-for-sale.component.scss']
})
export class StandsForSaleComponent implements OnInit {
  public isBuildYourDreamsExpanded = true;
  public isWhyChooseTedderfieldExpanded = true;
  public isStandsAreLimitedExpanded = true;
  public isStandsForSaleAdvertsExpanded = true;
  public standsForSaleData = new Array<GetStandsForSaleReponse.Stands>();
  public displayStandDetails = false;
  public standDetailsToDisplay: GetStandsForSaleReponse.Stands;

  constructor(public propertyForSaleService: PropertyForSaleService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getStandForSaleData();
  }

  public getStandForSaleData() {
    this.propertyForSaleService.getStandsForSaleData().then(results => {
      if (results.status === 200) {
        this.formatData(results.stands);
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Stands for Sale', results.message, null);
      }
    });
  }
  public formatData(results: any) {
    this.standsForSaleData = new Array<GetStandsForSaleReponse.Stands>();
    results?.forEach(standItem => {
      if (standItem.approvedByAdmin === '1') {
        const itemToPush = new GetStandsForSaleReponse.Stands();
        itemToPush.isExpanded = true;
        itemToPush.id = standItem.id;
        itemToPush.name = standItem.name;
        itemToPush.email = standItem.email;
        itemToPush.phoneNumber = standItem.phoneNumber;
        itemToPush.standNumber = standItem.standNumber;
        itemToPush.price = standItem.price;
        itemToPush.reasonsForSelling = standItem.reasonsForSelling;

        itemToPush.titleDocument = new GetStandsForSaleReponse.FileData();
        itemToPush.titleDocument.fileName = standItem.titleDocument;
        itemToPush.titleDocument.fileData = Endpoints.StandsForSaleBaseURL + itemToPush.id + '/title-document/' + standItem.titleDocument;

        const imageDataArray = standItem.standImages.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');

        itemToPush.standImages = new Array<GetStandsForSaleReponse.FileData>();
        imageDataArray.forEach(img => {
          const standImageURL = Endpoints.StandsForSaleBaseURL + itemToPush.id + '/images/' + img;
          itemToPush.standImages.push({ fileName: img, fileData: standImageURL });
        });


        itemToPush.standDimensions = JSON.parse(standItem.standDimensions ? standItem.standDimensions.replaceAll('\\', '') : {});

        // itemToPush.featuresAndBenefits = standItem.featuresAndBenefits?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
        itemToPush.securty = standItem.securty?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replace("`", "`")?.split(',');
        // itemToPush.leviesApplicable = standItem.leviesApplicable?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replace("`", "`")?.split(',');

        itemToPush.leviesApplicable = AppHelperFunction.splitStringToArray(standItem.leviesApplicable);

        // itemToPush.leviesApplicable = new Array<string>();
        // const leviesArray = standItem.leviesApplicable.split('\",\"');
        // leviesArray.forEach(levie => {
        //   itemToPush.leviesApplicable.push(levie.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replace("`", "`"));
        // });

        this.standsForSaleData.push(itemToPush);
      }
    });

  }

  public togglePannel(indexToToggle: number) {
    this.standsForSaleData[indexToToggle].isExpanded = !this.standsForSaleData[indexToToggle].isExpanded;
  }

  public viewStandDetails(standItemId: number) {
    this.standDetailsToDisplay = this.standsForSaleData.find(x => x.id === standItemId);
    if (this.standDetailsToDisplay) {
      document.getElementById('content-container').scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      this.displayStandDetails = true;
    }
  }

  public backClicked() {
    this.displayStandDetails = false;
    this.standDetailsToDisplay = null;
  }

  public openTitleDocument(fileDisplayName: string, standId: number) {
    this.propertyForSaleService.getStandForSaleTitleDocument(standId).then((results: any) => {
      if (results.status === 200 && results.documentData) {
        const urlForModal = 'data:application/pdf;base64,' + results.documentData.file;
        this.appModalService.ShowConfirmationModal(ModalTypes.PDFModal, fileDisplayName, urlForModal, { removeDownloadButton: true });
      }
    });
  }

  public displayInterestedInStandModal() {
    this.appModalService.ShowConfirmationModal(ModalTypes.InterestedInPropertyModal, 'Capture your details', '', null, this.submitInterestedInBuyingStand.bind(this));
  }

  public submitInterestedInBuyingStand(modalOutcome: string, requestData: SubmitInterestedInPropertyRequest) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      requestData.propertyId = this.standDetailsToDisplay.id;
      this.propertyForSaleService.submitInterestedInStandData(requestData).then((results: any) => {
        // if (results.status === 200 && results.documentData) {
        this.appModalService.CloseModal();
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Submit interest in stand', results.message, null);
        // }
      });
    }
  }


}
