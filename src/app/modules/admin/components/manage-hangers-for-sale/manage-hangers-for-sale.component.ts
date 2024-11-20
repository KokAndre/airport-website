import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { PropertyForSaleService } from 'src/app/modules/property-for-sale/services/property-for-sale.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { Endpoints, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetHangersForSaleReponse } from 'src/app/models/get-hangers-for-sale-reponse.model';

@Component({
  selector: 'app-manage-hangers-for-sale',
  templateUrl: './manage-hangers-for-sale.component.html',
  styleUrls: ['./manage-hangers-for-sale.component.scss']
})
export class ManageHangersForSaleComponent implements OnInit {
  public hangersForSaleData = new Array<GetHangersForSaleReponse.Hanger>();

  constructor(public adminService: AdminService,
    public propertyForSaleService: PropertyForSaleService,
    public appModalService: AppModalService) { }

  ngOnInit() {
    this.getHangerForSaleData()
  }

  public getHangerForSaleData() {
    this.propertyForSaleService.getHangerForSaleData().then(results => {
      if (results.status === 200) {
        if (results.hangers) {
          this.formatData(results.hangers);
        }
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Hangers for Sale Data', results.message, null);
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
      itemToPush.dateAdded = hangerItem.dateAdded;

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

      itemToPush.buildingMaterial = hangerItem.buildingMaterial?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.hangerCustomisations = hangerItem.hangerCustomisations?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.featuresAndBenefits = hangerItem.featuresAndBenefits?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.securty = hangerItem.securty?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.additionalInfrastructure = hangerItem.additionalInfrastructure?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.leviesApplicable = hangerItem.leviesApplicable?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');

      this.hangersForSaleData.push(itemToPush);
    });
  }

  public deleteHangerForSaleClicked(hangerData: GetHangersForSaleReponse.Hanger) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Hanager for Sale item', `Are you sure you want to delete the data for sale for hanger: ${hangerData.hangerNumber}?`, null, this.deleteHangerForSale.bind(this, hangerData));
  }

  public deleteHangerForSale(hangerData: GetHangersForSaleReponse.Hanger, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteHangerForSaleItem(hangerData.id).then(results => {
        if (results.status === 200) {
          this.getHangerForSaleData();
        }
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Hanger for Sale Data', results.message, null);
      });
    }
  }

}
