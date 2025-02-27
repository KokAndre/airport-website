import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { Router } from '@angular/router';
import { AppRoutes, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetBackendEmailConfigDataResponse } from 'src/app/models/get-backend-email-config-data-response.model';
import { ExcelService } from 'src/app/modules/shared/services/excel.service';

@Component({
  selector: 'app-manage-backend-email-config',
  templateUrl: './manage-backend-email-config.component.html',
  styleUrls: ['./manage-backend-email-config.component.scss']
})
export class ManageBackendEmailConfigComponent implements OnInit {
  public isLoading = false;
  public emailConfigData: GetBackendEmailConfigDataResponse.EmailConfigData[];

  constructor(public adminService: AdminService, public appModalService: AppModalService, public router: Router, public excelService: ExcelService) { }

  ngOnInit() {
    this.getEmailConfigData();
  }

  public getEmailConfigData() {
    this.adminService.getBackendEmailConfigData().subscribe((result: GetBackendEmailConfigDataResponse.RootObject) => {
      this.emailConfigData = result.emailConfigData;

      this.emailConfigData.forEach(item => {
        item.emailAdressesArray = item.emailAdresses.split(', ');
      });
    }, error => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      this.router.navigateByUrl(AppRoutes.Home);
    });
  }

  public editConfigItemClicked(configItem: GetBackendEmailConfigDataResponse.EmailConfigData) {
    const modalData = JSON.parse(JSON.stringify(configItem));
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureEmailConfigItem, 'Edit Config Data', '', modalData, this.editConfigItemOutcome.bind(this));
  }

  public editConfigItemOutcome(modalOutcome: string, configItem?: GetBackendEmailConfigDataResponse.EmailConfigData) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      const requestData = new GetBackendEmailConfigDataResponse.EmailConfigData;
      requestData.id = configItem.id;
      requestData.emailName = configItem.emailName;
      requestData.emailDisplayName = configItem.emailDisplayName;
      requestData.emailAdresses = '';
  
      configItem.emailAdressesArray.forEach(emailItem => {
        requestData.emailAdresses += emailItem + ', ';
      });
  
      // Remove the last ,
      requestData.emailAdresses = requestData.emailAdresses.slice(0, requestData.emailAdresses.length - 2);

      this.adminService.editBackendEmailConfigData(requestData).subscribe(results => {
        this.appModalService.CloseModal();
        this.getEmailConfigData();
      }, error => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      });
    }
  }

  public exportToExcel() {
    const dataForExcell = new Array<any>();

    this.emailConfigData.forEach(x => {
      // if (!this.checkIfRowIsHidden(x)) {
      const itemToPush = [
        x.id || '',
        x.emailDisplayName || '',
        x.emailAdresses || ''
      ];

      dataForExcell.push(itemToPush);
      // }
    });

    const fileName = 'Email Config Data';
    const headersData = ['ID', 'Email Name', 'Email Adresses'];

    this.excelService.generateExcel(fileName, headersData, dataForExcell);
  }

}
