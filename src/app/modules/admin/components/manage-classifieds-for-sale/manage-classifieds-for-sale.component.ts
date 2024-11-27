import { Component, OnInit } from '@angular/core';
import { Endpoints, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetClassifiedsDataResponse } from 'src/app/models/get-classifieds-data-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-manage-classifieds-for-sale',
  templateUrl: './manage-classifieds-for-sale.component.html',
  styleUrls: ['./manage-classifieds-for-sale.component.scss']
})
export class ManageClassifiedsForSaleComponent implements OnInit {
  public classifiedsData: GetClassifiedsDataResponse.Classified[];

  constructor(public adminService: AdminService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getClassifiedsData();
  }

  public getClassifiedsData() {
    this.adminService.getClassifiedsData().then(results => {
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

      itemToPush.description = classifiedItem.description?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.specialNotes = classifiedItem.specialNotes?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');

      const imageDataArray = classifiedItem.images.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');

      itemToPush.images = new Array<GetClassifiedsDataResponse.Image>();
      imageDataArray.forEach(img => {
        const classifiedsImageUrl = Endpoints.ClassifiedsImagesBaseURL + itemToPush.id + '/' + img;
        itemToPush.images.push({ fileName: img, fileData: classifiedsImageUrl });
      });

      this.classifiedsData.push(itemToPush);
    });
  }

  public deleteClassifiedsItemClicked(classifiedsItem: GetClassifiedsDataResponse.Classified) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Classifieds for Sale item', `Are you sure you want to delete the data for this item?`, null, this.deleteClassifiedsItemOutcome.bind(this, classifiedsItem));
  }

  public deleteClassifiedsItemOutcome(classifiedsItem: GetClassifiedsDataResponse.Classified, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteClassifiedsForSaleItem(classifiedsItem.id).then(results => {
        if (results.status === 200) {
          this.getClassifiedsData();
        }
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Classifieds for Sale Data', results.message, null);
      });
    }
  }

  public exportToExcel() {
    const standsForSaleExcelData = new Array<any>();
    this.classifiedsData.forEach(item => {
      let itemToPush: any = {};
      itemToPush.ID = item.id;
      itemToPush.Name = item.name;
      itemToPush.Email = item.email;
      itemToPush.PhoneNumber = item.phoneNumber;
      itemToPush.Price = item.price;
      itemToPush.Title = item.title;
      itemToPush.Category = item.category;
      itemToPush.Description = item.description;
      itemToPush.Location = item.location;
      itemToPush.ItemCondition = item.itemCondition;
      itemToPush.Availability = item.availability;
      itemToPush.SpecialNotes = item.specialNotes;


      itemToPush.Images = '';
      item.images.forEach(image => {
        itemToPush.Images += `${image.fileName}; `;
      });

      // itemToPush.FeaturesAndBenefits = '';
      // item.featuresAndBenefits?.forEach(item => {
      //   itemToPush.FeaturesAndBenefits += `${item}; `;
      // });

      itemToPush.DateAdded = item.dateAdded;

      standsForSaleExcelData.push(itemToPush);
    });

    this.adminService.exportAsExcelFile(standsForSaleExcelData, 'Classifieds For Sale');
  }

}
