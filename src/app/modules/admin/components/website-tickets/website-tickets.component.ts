import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { GetWebTicketsDataResponse } from 'src/app/models/get-web-tickets-data-response.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { AppRoutes, ModalOutcomeOptions, ModalTypes, UserDataInTokenToReturn } from 'src/app/enums/app.enums';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/modules/shared/services/excel.service';
import { TokenService } from 'src/app/services/token/token.service';
import * as moment from 'moment';

@Component({
  selector: 'app-website-tickets',
  templateUrl: './website-tickets.component.html',
  styleUrls: ['./website-tickets.component.scss']
})
export class WebsiteTicketsComponent implements OnInit {
  public isLoading = true;
  public webTicketsData: GetWebTicketsDataResponse.WebTicket[];
  public sectionsData: GetWebTicketsDataResponse.Section[];
  public allowAdminToDelete = false;
  public priorityData: GetWebTicketsDataResponse.Priority[];
  public statusData: GetWebTicketsDataResponse.Status[];
  // public currentDate = moment(new Date()).format('YYYY-MM-DD');

  // Category Filters
  public orderByCategory = false;
  public allCategoryCheckBox = true;
  public webCategoryCheckBox = true;
  public adminCategoryCheckBox = true

  // Person Responsible Filters
  public orderByPersonResponsible = false;
  public allPersonResponsibleCheckBox = true;
  public andrePersonResponsibleCheckBox = true;
  public nicPersonResponsibleCheckBox = true;
  public mandyPersonResponsibleCheckBox = true;

  // Priority Filters
  public orderByPriority = false;
  public allPriorityCheckBox = true;

  // Status Filters
  public orderByStatus = false;
  public allStatusCheckBox = true;

  constructor(public adminService: AdminService,
    public appModalService: AppModalService,
    public router: Router,
    public excelService: ExcelService,
    public tokenService: TokenService) { }

  ngOnInit() {
    this.checkIfUserIsUperAdmin();
    this.getWebTicketsData(false);
  }

  public checkIfUserIsUperAdmin() {
    this.allowAdminToDelete = this.tokenService.getUserData(UserDataInTokenToReturn.IsSuperAdmin) as boolean;
  }

  public getWebTicketsData(isRefresh: boolean) {
    this.adminService.getWebsiteTickets().subscribe((result: GetWebTicketsDataResponse.RootObject) => {
      this.webTicketsData = result.webTickets;

      if (!isRefresh) {
        this.sectionsData = result.sections;
        this.priorityData = result.priorities;
        this.statusData = result.statusList;

        this.priorityData.forEach(x => {
          x.isFilterSelected = true;
        });

        this.statusData.forEach(x => {
          x.isFilterSelected = true;
        });

        setTimeout(() => {
          this.isLoading = false;
        }, 100);

        if (!this.sectionsData) {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Web Tickets Config', 'There was an issue geting the Web Tickets config data.', '');
          this.router.navigateByUrl(AppRoutes.Home);
        }
      }
    }, error => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      this.router.navigateByUrl(AppRoutes.Home);
    });
  }

  public allCategoryClicked() {
    this.webCategoryCheckBox = this.allCategoryCheckBox;
    this.adminCategoryCheckBox = this.allCategoryCheckBox;
  }

  public orderDataByCategory() {
    this.orderByCategory = !this.orderByCategory;

    if (this.orderByCategory) {
      this.webTicketsData.sort((a, b) => a.category > b.category ? 1 : -1);
    } else {
      this.webTicketsData.sort((a, b) => a.category > b.category ? -1 : 1);
    }
  }

  public allPersonResponsibleClicked() {
    this.andrePersonResponsibleCheckBox = this.allPersonResponsibleCheckBox;
    this.nicPersonResponsibleCheckBox = this.allPersonResponsibleCheckBox;
    this.mandyPersonResponsibleCheckBox = this.allPersonResponsibleCheckBox;
  }

  public orderByPersonResponsibleClicked() {
    this.orderByPersonResponsible = !this.orderByPersonResponsible;

    if (this.orderByPersonResponsible) {
      this.webTicketsData.sort((a, b) => a.personResponsible > b.personResponsible ? 1 : -1);
    } else {
      this.webTicketsData.sort((a, b) => a.personResponsible > b.personResponsible ? -1 : 1);
    }
  }

  public allPriorityClicked() {
    this.priorityData.forEach(x => {
      x.isFilterSelected = this.allPriorityCheckBox;
    });
  }

  public orderByPriorityClicked() {
    this.orderByPriority = !this.orderByPriority;

    if (this.orderByPriority) {
      this.webTicketsData.sort((a, b) => a.priority > b.priority ? 1 : -1);
    } else {
      this.webTicketsData.sort((a, b) => a.priority > b.priority ? -1 : 1);
    }
  }

  public allStatusClicked() {
    this.statusData.forEach(x => {
      x.isFilterSelected = this.allStatusCheckBox;
    });
  }

  public orderByStatusClicked() {
    this.orderByStatus = !this.orderByStatus;

    if (this.orderByStatus) {
      this.webTicketsData.sort((a, b) => a.status > b.status ? 1 : -1);
    } else {
      this.webTicketsData.sort((a, b) => a.status > b.status ? -1 : 1);
    }
  }

  public checkIfRowIsHidden(row: GetWebTicketsDataResponse.WebTicket) {

    if (row.category === 'Web Development' && !this.webCategoryCheckBox) {
      return true
    }
    if (row.category === 'Administration' && !this.adminCategoryCheckBox) {
      return true
    }

    if (row.personResponsible === 'Andre' && !this.andrePersonResponsibleCheckBox) {
      return true
    }
    if (row.personResponsible === 'Mandy' && !this.mandyPersonResponsibleCheckBox) {
      return true
    }
    if (row.personResponsible === 'Nic' && !this.nicPersonResponsibleCheckBox) {
      return true
    }

    const priorityOfRow = this.priorityData.find(x => x.priority === row.priority);
    if (!priorityOfRow?.isFilterSelected) {
      return true;
    }

    const statusOfPriority = this.statusData.find(x => x.status === row.status);
    if (!statusOfPriority?.isFilterSelected) {
      return true;
    }

    return false;
  }

  public myOpenTicketsClicked() {
    // Filter only by person that is logged in
    const loggedInPersonName = this.tokenService.getUserData(UserDataInTokenToReturn.Name);
    if (loggedInPersonName === 'Andre') {
      this.allPersonResponsibleCheckBox = false;
      this.andrePersonResponsibleCheckBox = true;
      this.nicPersonResponsibleCheckBox = false;
      this.mandyPersonResponsibleCheckBox = false;
    }

    if (loggedInPersonName === 'Nic') {
      this.allPersonResponsibleCheckBox = false;
      this.andrePersonResponsibleCheckBox = false;
      this.nicPersonResponsibleCheckBox = true;
      this.mandyPersonResponsibleCheckBox = false;
    }

    if (loggedInPersonName === 'Mandy') {
      this.allPersonResponsibleCheckBox = false;
      this.andrePersonResponsibleCheckBox = false;
      this.nicPersonResponsibleCheckBox = false;
      this.mandyPersonResponsibleCheckBox = true;
    }

    // Filter on all ticketsd that are not in a Done status
    this.allStatusCheckBox = false;
    this.statusData.forEach(status => {
      if (status.status === 'To Do' || status.status === 'In Progress' || status.status === 'Testing Failed') {
        status.isFilterSelected = true;
      } else {
        status.isFilterSelected = false;
      }
    });
  }

  public addWebItemClicked() {
    const modalData = {
      sections: JSON.parse(JSON.stringify(this.sectionsData)),
      priorities: JSON.parse(JSON.stringify(this.priorityData)),
      statusList: JSON.parse(JSON.stringify(this.statusData)),
      webTicket: new GetWebTicketsDataResponse.WebTicket()
    };

    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureWebTicketData, 'Add Web Ticket', '', modalData, this.addWebTicketOutcome.bind(this));
  }

  public addWebTicketOutcome(modalOutcome: string, webTicket?: GetWebTicketsDataResponse.WebTicket) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.adminService.addNewWebTicket(webTicket).subscribe(results => {
        this.appModalService.CloseModal();
        this.getWebTicketsData(true);
      }, error => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      });
    }
  }

  public editWebItemClicked(webItem: GetWebTicketsDataResponse.WebTicket) {
    const modalData = {
      sections: JSON.parse(JSON.stringify(this.sectionsData)),
      priorities: JSON.parse(JSON.stringify(this.priorityData)),
      statusList: JSON.parse(JSON.stringify(this.statusData)),
      webTicket: JSON.parse(JSON.stringify(webItem))
    };

    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureWebTicketData, 'Edit Web Ticked', '', modalData, this.editWebTicketOutcome.bind(this));
  }

  public editWebTicketOutcome(modalOutcome: string, webTicket?: GetWebTicketsDataResponse.WebTicket) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.adminService.editWebTicket(webTicket).subscribe(results => {
        this.appModalService.CloseModal();
        this.getWebTicketsData(true);
      }, error => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      });
    }
  }

  public deleteWebItemClicked(webItem: GetWebTicketsDataResponse.WebTicket) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Web Ticket', 'Are you sure you want to delte the web ticket?', null, this.deleteWebItemOutcome.bind(this, webItem));
  }

  public deleteWebItemOutcome(webItem: GetWebTicketsDataResponse.WebTicket, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteWebTicket(webItem.id).subscribe(results => {
        this.appModalService.CloseModal();
        this.getWebTicketsData(true);
      }, error => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      });
    }
  }

  public updateWebItem(webItemId: number) {
    const webItemToUpdate = this.webTicketsData.find(x => x.id === webItemId);

    this.adminService.editWebTicket(webItemToUpdate).subscribe(results => {
      this.appModalService.CloseModal();
      this.getWebTicketsData(true);
    }, error => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
    });
  }

  public estimatedCompletionDateChanged(newDate: string, webTicketId: number) {
    this.webTicketsData.find(x => x.id === webTicketId).estimatedCompletionDate = newDate;
    this.updateWebItem(webTicketId);
  }

  public exportToExcel() {
    const dataForExcell = new Array<any>();

    this.webTicketsData.forEach(x => {
      if (!this.checkIfRowIsHidden(x)) {
        const itemToPush = [
          x.id || '',
          x.name || '',
          x.category || '',
          x.description || '',
          x.section || '',
          x.page || '',
          x.personResponsible || '',
          x.priority || '',
          x.status || '',
          x.estimatedCompletionDate || '',

        ];

        dataForExcell.push(itemToPush);
      }
    });

    const fileName = 'Web Tickets';
    const headersData = ['ID', 'Name', 'Category', 'Description', 'Section', 'Page	', 'Assignee', 'Priority', 'Status', 'Estimated Completion Date',];

    this.excelService.generateExcel(fileName, headersData, dataForExcell);
  }
}