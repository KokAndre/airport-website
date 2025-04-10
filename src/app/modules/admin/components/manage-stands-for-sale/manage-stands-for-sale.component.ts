import { Component, OnInit } from '@angular/core';
import { Endpoints, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetStandsForSaleReponse } from 'src/app/models/get-stands-for-sale-reponse.model';
import { PropertyForSaleService } from 'src/app/modules/property-for-sale/services/property-for-sale.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-stands-for-sale',
  templateUrl: './manage-stands-for-sale.component.html',
  styleUrls: ['./manage-stands-for-sale.component.scss']
})
export class ManageStandsForSaleComponent implements OnInit {
  public standsForSaleData = new Array<GetStandsForSaleReponse.Stands>();

  constructor(public propertyForSaleService: PropertyForSaleService, public appModalService: AppModalService, public adminService: AdminService) { }

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
      const itemToPush = new GetStandsForSaleReponse.Stands();
      itemToPush.isExpanded = true;
      itemToPush.id = standItem.id;
      itemToPush.name = standItem.name;
      itemToPush.email = standItem.email;
      itemToPush.phoneNumber = standItem.phoneNumber;
      itemToPush.standNumber = standItem.standNumber;
      itemToPush.price = standItem.price;
      itemToPush.reasonsForSelling = standItem.reasonsForSelling;
      itemToPush.dateAdded = standItem.dateAdded;
      itemToPush.approvedByAdmin = standItem.approvedByAdmin;

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
      itemToPush.securty = standItem.securty?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.leviesApplicable = standItem.leviesApplicable?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');

      this.standsForSaleData.push(itemToPush);
    });
  }

  public deleteStandForSaleClicked(standData: GetStandsForSaleReponse.Stands) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Stand for Sale item', `Are you sure you want to delete the data for sale for stand: ${standData.standNumber}?`, null, this.deleteStandForSale.bind(this, standData));
  }

  public deleteStandForSale(standData: GetStandsForSaleReponse.Stands, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteStandForSaleItem(standData.id).then(results => {
        if (results.status === 200) {
          this.getStandForSaleData();
        }
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Stand for Sale Data', results.message, null);
      });
    }
  }

  public markAdAsApprovedClicked(standData: GetStandsForSaleReponse.Stands) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Approve Stand for Sale', `Are you sure you want to approve the data for the following stand to go live to the public? <br /> Stand: ${standData.standNumber}`, null, this.markAdAsApprovedOutcome.bind(this, standData));
  }

  public markAdAsApprovedOutcome(standData: GetStandsForSaleReponse.Stands, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.approveStandForSaleItem(standData).then(results => {
        if (results.status === 200) {
          this.getStandForSaleData();
        }
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Approve Stand for Sale', results.message, null);
      });
    }
  }

  public exportToExcel() {
    const standsForSaleExcelData = new Array<any>();
    this.standsForSaleData.forEach(item => {
      let itemToPush: any = {};
      itemToPush.ID = item.id;
      itemToPush.Name = item.name;
      itemToPush.Email = item.email;
      itemToPush.PhoneNumber = item.phoneNumber;
      itemToPush.Price = item.price;
      itemToPush.ReasonsForSelling = item.reasonsForSelling;
      itemToPush.StandDimensions = `Width: ${item.standDimensions?.width || 'N/A'}, Length: ${item.standDimensions?.length || 'N/A'}`;
      itemToPush.TitleDocument = item.titleDocument?.fileName;

      itemToPush.StandImages = '';
      item.standImages.forEach(image => {
        itemToPush.StandImages += `${image.fileName}; `;
      });

      itemToPush.FeaturesAndBenefits = '';
      item.featuresAndBenefits?.forEach(item => {
        itemToPush.FeaturesAndBenefits += `${item}; `;
      });

      itemToPush.Securty = '';
      item.securty?.forEach(item => {
        itemToPush.Securty += `${item}; `;
      });

      itemToPush.LeviesApplicable = '';
      item.leviesApplicable?.forEach(item => {
        itemToPush.LeviesApplicable += `${item}; `;
      });

      itemToPush.DateAdded = item.dateAdded;

      standsForSaleExcelData.push(itemToPush);
    });

    this.adminService.exportAsExcelFile(standsForSaleExcelData, 'Stands For Sale');
  }
}
