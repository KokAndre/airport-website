import { Component, OnInit } from '@angular/core';
import { FataMerchService } from '../../services/fata-merch.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { Endpoints, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetClassifiedsDataResponse } from 'src/app/models/get-classifieds-data-response.model';
import { SubmitInterestedInPropertyRequest } from 'src/app/models/submit-interested-in-property-request.model';
import { SubmitInterestedInClassifiedsRequest } from 'src/app/models/submit-interested-in-classifieds-request.model';

@Component({
  selector: 'app-classifieds',
  templateUrl: './classifieds.component.html',
  styleUrls: ['./classifieds.component.scss']
})
export class ClassifiedsComponent implements OnInit {
  public displayClassifiedsDetails = false;
  public isWelcomeToClassifiedsExpanded = true;
  public isHowItWorksExpanded = true;
  public isNoClassifiedsAdvertsExpanded = true;
  public isBrowseAndBuyExpanded = true;
  public isQuestionOrInterestExpanded = true;
  public classifiedsData: GetClassifiedsDataResponse.Classified[];
  public clasifiedDetailsToDisplay: GetClassifiedsDataResponse.Classified;
  public isClassifiedsAdvertsExpanded = true;

  constructor(public fataMerchService: FataMerchService, private appModalService: AppModalService) { }

  ngOnInit() {
    this.getClassifiedsData();
  }

  public getClassifiedsData() {
    this.fataMerchService.getClassifiedsData().then(results => {
      if (results.status === 200) {
        this.formatData(results.classifieds);
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Classifieds', results.message, null);
      }
    });
  }

  public formatData(results: any) {
    this.classifiedsData = new Array<GetClassifiedsDataResponse.Classified>();
    results?.forEach(classifiedItem => {
      const itemToPush = new GetClassifiedsDataResponse.Classified();
      itemToPush.isExpanded = true;
      itemToPush.id = classifiedItem.id;
      itemToPush.title = classifiedItem.title;
      itemToPush.category = classifiedItem.category;
      // itemToPush.description = classifiedItem.description;
      itemToPush.price = classifiedItem.price;
      // itemToPush.images = classifiedItem.images;
      itemToPush.location = classifiedItem.location;
      itemToPush.name = classifiedItem.name;
      itemToPush.phoneNumber = classifiedItem.phoneNumber;
      itemToPush.email = classifiedItem.email;
      itemToPush.itemCondition = classifiedItem.itemCondition;
      itemToPush.availability = classifiedItem.availability;
      // itemToPush.specialNotes = classifiedItem.specialNotes;
      itemToPush.dateAdded = classifiedItem.dateAdded;

      itemToPush.description = classifiedItem.description?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replace("`", "'")?.split(',');
      itemToPush.specialNotes = classifiedItem.specialNotes?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replace("`", "'")?.split(',');

      const imageDataArray = classifiedItem.images.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');

      itemToPush.images = new Array<GetClassifiedsDataResponse.Image>();
      imageDataArray.forEach(img => {
        const classifiedsImageUrl = Endpoints.ClassifiedsImagesBaseURL + itemToPush.id + '/' + img;
        itemToPush.images.push({ fileName: img, fileData: classifiedsImageUrl });
      });

      this.classifiedsData.push(itemToPush);
    });
  }

  public togglePannel(indexToToggle: number) {
    this.classifiedsData[indexToToggle].isExpanded = !this.classifiedsData[indexToToggle].isExpanded;
  }

  public viewClassifiedDetails(standItemId: number) {
    this.clasifiedDetailsToDisplay = this.classifiedsData.find(x => x.id === standItemId);
    if (this.clasifiedDetailsToDisplay) {
      document.getElementById('content-container').scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      this.displayClassifiedsDetails = true;
    }
  }

  public backClicked() {
    this.displayClassifiedsDetails = false;
    this.clasifiedDetailsToDisplay = null;
  }

  public displayInterestedInItemModal() {
    this.appModalService.ShowConfirmationModal(ModalTypes.InterestedInPropertyModal, 'Capture your details', '', null, this.submitInterestedInBuyingItem.bind(this));
  }

  public submitInterestedInBuyingItem(modalOutcome: string, requestData: SubmitInterestedInClassifiedsRequest) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      requestData.itemId = this.clasifiedDetailsToDisplay.id;
      this.fataMerchService.submitInterestedInItem(requestData).then((results: any) => {
        this.appModalService.CloseModal();
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Submit interest in stand', results.message, null);
      });
    }
  }

}
