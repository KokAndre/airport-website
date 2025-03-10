import { Component, OnInit } from '@angular/core';
import { GetLeviesResponse } from 'src/app/models/get-levies-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';

@Component({
  selector: 'app-manage-levies',
  templateUrl: './manage-levies.component.html',
  styleUrls: ['./manage-levies.component.scss']
})
export class ManageLeviesComponent implements OnInit {
  public leviesOriginalData = new Array<GetLeviesResponse.Levie>();
  public leviesData = new Array<GetLeviesResponse.Levie>();
  public newLevieItem = new GetLeviesResponse.Levie();

  constructor(public adminService: AdminService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getLeviesData();
  }

  public getLeviesData() {
    this.adminService.getLeviesData().then(results => {
      if (results.status === 200) {
        this.setLeviesData(results.levies);
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Levies Data', results.message, null);
      }
    });
  }

  public setLeviesData(leviesResponseData: any) {
    this.newLevieItem = new GetLeviesResponse.Levie();

    this.leviesOriginalData = new Array<GetLeviesResponse.Levie>();
    this.leviesData = new Array<GetLeviesResponse.Levie>();

    leviesResponseData?.forEach(item => {
      const itemToPush = new GetLeviesResponse.Levie();
      itemToPush.id = item.id;
      itemToPush.levieName = item.levieName;
      itemToPush.leviePrice = item.leviePrice;
      itemToPush.levieFrequency = item.levieFrequency || 'month';
      itemToPush.isForHangars = item.isForHangars === '1' ? true : false;
      itemToPush.isForStands = item.isForStands === '1' ? true : false;

      this.leviesOriginalData.push(JSON.parse(JSON.stringify(itemToPush)));
      this.leviesData.push(itemToPush);
    });
  }

  public numberControlInput(levieItemId: number, leviePrice: string) {
    const valueToSet = AppHelperFunction.inputBoxSeparatorWithoutDecimals(leviePrice);
    this.leviesData.find(x => x.id === levieItemId).leviePrice = valueToSet;
  }

  public newLevieNumberControlInput(leviePrice: string) {
    const valueToSet = AppHelperFunction.inputBoxSeparatorWithoutDecimals(leviePrice);
    this.newLevieItem.leviePrice = valueToSet;
  }

  public isLevieUpdateButtonDisabled(levieItem: GetLeviesResponse.Levie) {
    if (!levieItem.levieName || !levieItem.leviePrice || !levieItem.levieFrequency || (!levieItem.isForHangars && !levieItem.isForStands)) {
      return true;
    }

    if (levieItem.id) {
      const originalLevieItem = this.leviesOriginalData.find(x => x.id === levieItem.id);
      let hasItemChanged = false;
      if (levieItem.levieName !== originalLevieItem.levieName) {
        hasItemChanged = true;
      }
      if (levieItem.leviePrice !== originalLevieItem.leviePrice) {
        hasItemChanged = true;
      }
      if (levieItem.levieFrequency !== originalLevieItem.levieFrequency) {
        hasItemChanged = true;
      }
      if (levieItem.isForHangars !== originalLevieItem.isForHangars) {
        hasItemChanged = true;
      }
      if (levieItem.isForStands !== originalLevieItem.isForStands) {
        hasItemChanged = true;
      }

      return !hasItemChanged;
    } else {
      return false;
    }
  }

  public deleteLevieClicked(levieId: number) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete levie item', `Are you sure you want to delete the levie item?`, null, this.deleteLevie.bind(this, levieId));
  }

  public deleteLevie(levieId: number, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteLieviesItem(levieId).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete levie item', results.message, null);
          this.getLeviesData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete levie item', results.message, null);
        }
      });
    }
  }

  public updateLevieItemClicked(levieItem: GetLeviesResponse.Levie) {
    this.adminService.updateLieviesItem(levieItem).then(results => {
      if (results.status === 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Update levie item', results.message, null);
        this.getLeviesData();
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Update levie item', results.message, null);
      }
    });
  }

  public cancelClicked() {
    this.newLevieItem = new GetLeviesResponse.Levie();
  }

  public addNewLevieItemClicked() {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Add levie item', `Are you sure you want to add the following levie item: <br> ${this.newLevieItem.levieName} ZAR${this.newLevieItem.leviePrice} per ${this.newLevieItem.levieFrequency}`, null, this.addNewLevieItem.bind(this));
  }

  public addNewLevieItem(modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.addLieviesItem(this.newLevieItem).then(results => {
        if (results.status === 200) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Add levie item', results.message, null);
          this.getLeviesData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Add levie item', results.message, null);
        }
      });
    }
  }

}