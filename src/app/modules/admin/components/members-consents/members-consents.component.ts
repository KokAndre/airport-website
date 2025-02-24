import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { GetMembersConsentsResponse } from 'src/app/models/get-members-consents-response.model';
import { ExcelService } from 'src/app/modules/shared/services/excel.service';

@Component({
  selector: 'app-members-consents',
  templateUrl: './members-consents.component.html',
  styleUrls: ['./members-consents.component.scss']
})
export class MembersConsentsComponent implements OnInit {
  public isLoading = true;
  public membersConsentsData: GetMembersConsentsResponse.Consent[];

  constructor(public adminService: AdminService,
    public router: Router,
    public appModalService: AppModalService,
    public excelService: ExcelService) { }

  ngOnInit() {
    this.getMembersConsentData();
  }

  public getMembersConsentData() {
    this.adminService.getMembersConsentTickets().subscribe((result: GetMembersConsentsResponse.RootObject) => {
      this.membersConsentsData = result.consents;
      this.isLoading = false;
    }, error => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      this.router.navigateByUrl(AppRoutes.Home);
    })
  }

  public checkIfRowIsHidden(row: GetMembersConsentsResponse.Consent) {
    return false;
  }

  public exportToExcel() {
    const dataForExcell = new Array<any>();

    this.membersConsentsData.forEach(x => {
      if (!this.checkIfRowIsHidden(x)) {
        const itemToPush = [
          x.id || '',
          x.consentName || '',
          x.pageOfConsent || '',
          x.date || '',
          x.clientName || '',
          x.clientEmail || ''
        ];
        dataForExcell.push(itemToPush);
      }
    });

    const fileName = 'Members Consents';
    const headersData = ['ID', 'Consent Name', 'Page Of Consent', 'Date', 'Client Name', 'Client Email'];

    this.excelService.generateExcel(fileName, headersData, dataForExcell);
  }
}
