import { Component, OnInit } from '@angular/core';
import { ModalOutcomeOptions, ModalTypes, UserDataInTokenToReturn } from 'src/app/enums/app.enums';
import { GetReportIssueDataResponse } from 'src/app/models/get-report-issue-data-response.model';
import { ExcelService } from 'src/app/modules/shared/services/excel.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { TokenService } from 'src/app/services/token/token.service';
import { AdminService } from '../../services/admin.service';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';

export enum StatusEnum {
  notStarted = "Not Started",
  inProgress = "In Progress",
  done = "Done",
}

@Component({
  selector: 'app-report-issue-requests',
  templateUrl: './report-issue-requests.component.html',
  styleUrls: ['./report-issue-requests.component.scss']
})
export class ReportIssueRequestsComponent implements OnInit {
  public isLoading = true;
  public reportIssueRequests: GetReportIssueDataResponse.Requests[];
  public categoryList: GetReportIssueDataResponse.Category[];
  public responsiblePersonList: GetReportIssueDataResponse.ResponsiblePerson[];
  public priorityList: GetReportIssueDataResponse.priorityList[];
  public allowAdminToDelete = false;
  public loggedInUserName = '';

  // Person Responsible Filters
  public blankPersonResponsibleCheckBox = true;
  public allPersonResponsibleCheckbox = true;
  public sortAlphabeticalPersonResponsible = false;

  // Category Filters
  public blankCategoryCheckBox = true;
  public allCategoryCheckbox = true;
  public sortAlphabeticalCategory = false;

  // Status Filters
  public statusNotStartedCheckBox = true;
  public statusInProgressCheckBox = true;
  public statusDoneCheckBox = false;
  public allStatusCheckBox = true;
  public sortAlphabeticalStatus = false;

  // Hangar Or Stand Number Filters
  public propertyNumbersList: GetReportIssueDataResponse.PropertyNumber[];
  public allPropertyNumberCheckBox = true;
  public sortAlphabeticalPropertyNumber = false;

  // Priority Filters
  public blankPriorityCheckBox = true;
  public allPriorityCheckbox = true;
  public sortAlphabeticalPriority = false;

  constructor(private adminService: AdminService,
    private appModalService: AppModalService,
    public tokenService: TokenService,
    public excelService: ExcelService) { }

  ngOnInit() {
    this.getReportIssueData();
    this.checkIfAdminIsAllowedToDelete();
  }

  private checkIfAdminIsAllowedToDelete() {
    // const userDetails = this.tokenService.getUserData() as GetUserDataResponse.Data;
    this.loggedInUserName = this.tokenService.getUserData(UserDataInTokenToReturn.Name) as string;

    this.allowAdminToDelete = this.tokenService.getUserData(UserDataInTokenToReturn.IsSuperAdmin) as boolean;
  }

  public getReportIssueData() {
    this.adminService.getReportIssueData().then((results: GetReportIssueDataResponse.RootObject) => {
      if (results.status === 200) {
        this.reportIssueRequests = results.requests;
        this.categoryList = results.categories;
        this.responsiblePersonList = results.resposiblePersons;
        this.priorityList = results.priority;

        this.propertyNumbersList = new Array<GetReportIssueDataResponse.PropertyNumber>();
        this.reportIssueRequests.forEach(request => {
          if (!this.propertyNumbersList.find(x => x.description?.toLowerCase()?.trim() === request.hangerOrSectionNumber?.toLowerCase()?.trim())) {
            const itemToPush = new GetReportIssueDataResponse.PropertyNumber();
            itemToPush.description = request.hangerOrSectionNumber;
            itemToPush.isFilterSelected = true;
            this.propertyNumbersList.push(itemToPush);
          }
        });

        
      this.propertyNumbersList.sort((a, b) => a.description > b.description ? 1 : -1);

        this.categoryList.forEach(x => {
          x.isFilterSelected = true;
        });

        this.responsiblePersonList.forEach(x => {
          x.isFilterSelected = true;
        });

        this.priorityList.forEach(x => {
          x.isFilterSelected = true;
        });

        this.orderDataByPriority();

        setTimeout(() => {
          this.isLoading = false;
        }, 300);


      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Report Issue Data', results.message, null);
      }
    });
  }

  public checkIfRowIsHidden(row: GetReportIssueDataResponse.Requests) {

    const personResponsibleOfRow = this.responsiblePersonList.find(x => x.name === row.personResponsible);

    if (personResponsibleOfRow) {
      if (!personResponsibleOfRow?.isFilterSelected) {
        return true;
      }
    } else if (!this.blankPersonResponsibleCheckBox) {
      return true;
    }

    const categoryOfRow = this.categoryList.find(x => x.category === row.category);

    if (categoryOfRow) {
      if (!categoryOfRow?.isFilterSelected) {
        return true;
      }
    } else if (!this.blankCategoryCheckBox) {
      return true;
    }

    const propertyNumberOfRow = this.propertyNumbersList.find(x => x.description?.toLowerCase()?.trim() === row.hangerOrSectionNumber?.toLowerCase()?.trim());

    if (propertyNumberOfRow) {
      if (!propertyNumberOfRow?.isFilterSelected) {
        return true;
      }
    }

    if (row.status === 'notStarted' && !this.statusNotStartedCheckBox) {
      return true
    }
    if (row.status === 'inProgress' && !this.statusInProgressCheckBox) {
      return true
    }
    if (row.status === 'done' && !this.statusDoneCheckBox) {
      return true
    }

    const priorityOfRow = this.priorityList.find(x => x.name === row.priority);

    if (priorityOfRow) {
      if (!priorityOfRow?.isFilterSelected) {
        return true;
      }
    } else if (!this.blankPriorityCheckBox) {
      return true;
    }

    return false;
  }

  public allResponsiblePersonsClicked() {
    this.responsiblePersonList.forEach(x => {
      x.isFilterSelected = this.allPersonResponsibleCheckbox;
    });
    this.blankPersonResponsibleCheckBox = this.allPersonResponsibleCheckbox;
  }

  public orderDataByPersonResponsible() {
    this.sortAlphabeticalPersonResponsible = !this.sortAlphabeticalPersonResponsible;

    if (this.sortAlphabeticalPersonResponsible) {
      this.reportIssueRequests.sort((a, b) => a.personResponsible > b.personResponsible ? 1 : -1);
    } else {
      this.reportIssueRequests.sort((a, b) => a.personResponsible > b.personResponsible ? -1 : 1);
    }
  }

  public allCategoryClicked() {
    this.categoryList.forEach(x => {
      x.isFilterSelected = this.allCategoryCheckbox;
    });
    this.blankCategoryCheckBox = this.allCategoryCheckbox;
  }

  public orderDataByCategory() {
    this.sortAlphabeticalCategory = !this.sortAlphabeticalCategory;

    if (this.sortAlphabeticalCategory) {
      this.reportIssueRequests.sort((a, b) => a.category > b.category ? 1 : -1);
    } else {
      this.reportIssueRequests.sort((a, b) => a.category > b.category ? -1 : 1);
    }
  }

  public orderDataByPriority() {
    this.sortAlphabeticalPriority = !this.sortAlphabeticalPriority;

    // if (this.sortAlphabeticalPriority) {
    // this.reportIssueRequests.sort((a, b) => a.priority > b.priority ? 1 : -1);
    // } else {
    //   this.reportIssueRequests.sort((a, b) => a.priority > b.priority ? -1 : 1);
    // }

    // New Prority Sort
    // Firtst order the priority list
    if (this.sortAlphabeticalPriority) {
      this.priorityList.sort((a, b) => a.id > b.id ? 1 : -1);
    } else {
      this.priorityList.sort((a, b) => a.id > b.id ? -1 : 1);
    }

    // Loop through the priority list, and pust the item in order of the priority list
    let newOrderedList = new Array<GetReportIssueDataResponse.Requests>();
    this.priorityList.forEach(priority => {
      newOrderedList = [...newOrderedList, ...this.reportIssueRequests.filter(x => x.priority === priority.name)];
    });

    // Add in the blank priority items
    newOrderedList = [...newOrderedList, ...this.reportIssueRequests.filter(x => x.priority === '')];

    this.reportIssueRequests = newOrderedList;
  }

  public allStatusClicked() {
    // this.allStatusCheckBox = !this.allStatusCheckBox;

    this.statusNotStartedCheckBox = this.allStatusCheckBox;
    this.statusInProgressCheckBox = this.allStatusCheckBox;
    this.statusDoneCheckBox = this.allStatusCheckBox;
  }

  public orderDataByStatusy() {
    this.sortAlphabeticalStatus = !this.sortAlphabeticalStatus;

    if (this.sortAlphabeticalStatus) {
      this.reportIssueRequests.sort((a, b) => a.status > b.status ? 1 : -1);
    } else {
      this.reportIssueRequests.sort((a, b) => a.status > b.status ? -1 : 1);
    }
  }

  public allProperyNumberClicked() {
    this.propertyNumbersList.forEach(x => {
      x.isFilterSelected = this.allPropertyNumberCheckBox;
    });
    this.blankPriorityCheckBox = this.allPriorityCheckbox
  }


  public allPriorityClicked() {
    this.priorityList.forEach(x => {
      x.isFilterSelected = this.allPriorityCheckbox;
    });
    this.blankPriorityCheckBox = this.allPriorityCheckbox;
  }

  public orderDataByPropertyNumber() {
    this.sortAlphabeticalPropertyNumber = !this.sortAlphabeticalPropertyNumber;

    if (this.sortAlphabeticalPropertyNumber) {
      this.reportIssueRequests.sort((a, b) => a.hangerOrSectionNumber > b.hangerOrSectionNumber ? 1 : -1);
    } else {
      this.reportIssueRequests.sort((a, b) => a.hangerOrSectionNumber > b.hangerOrSectionNumber ? -1 : 1);
    }
  }

  public myOpenTicketsClicked() {
    // Filter only by person that is logged in
    this.responsiblePersonList.forEach((x, index) => {
      if (x.name?.toLowerCase() === this.loggedInUserName?.toLowerCase()) {
        this.responsiblePersonList[index].isFilterSelected = true;
      } else {
        this.responsiblePersonList[index].isFilterSelected = false;
      }
    });
    this.blankPersonResponsibleCheckBox = false;

    // Filter on all ticketsd that are not in a Done status
    this.allStatusCheckBox = false;
    this.statusNotStartedCheckBox = true;
    this.statusInProgressCheckBox = true;
    this.statusDoneCheckBox = false;

    // Order all tickets by Priority
    this.sortAlphabeticalPriority = false;
    this.orderDataByPriority();
  }

  public clearFilters() {
    this.allPropertyNumberCheckBox = true;
    this.propertyNumbersList.forEach(x => {
      x.isFilterSelected = true;
    });

    this.allCategoryCheckbox = true;
    this.categoryList.forEach(x => {
      x.isFilterSelected = true;
    });

    this.allPriorityCheckbox = true;
    this.priorityList.forEach(x => {
      x.isFilterSelected = true;
    });

    this.allPersonResponsibleCheckbox = true;
    this.responsiblePersonList.forEach(x => {
      x.isFilterSelected = true;
    });

    this.allStatusCheckBox = true;
    this.statusNotStartedCheckBox = true;
    this.statusInProgressCheckBox = true;
    this.statusDoneCheckBox = true;
  }

  public editReportIssueRequestClicked(reportIssueItem: GetReportIssueDataResponse.Requests) {
    const modalData = new GetReportIssueDataResponse.Requests();
    modalData.id = reportIssueItem.id;
    modalData.hangerOrSectionNumber = reportIssueItem.hangerOrSectionNumber;
    modalData.issueDescription = reportIssueItem.issueDescription;
    this.appModalService.ShowConfirmationModal(ModalTypes.EditReportIssueData, 'Edit Report Issue Request Data', '', modalData, this.editReportIssueRequest.bind(this));
  }

  public editReportIssueRequest(modalOutcome: string, reportIssueItem?: GetReportIssueDataResponse.Requests) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.appModalService.CloseModal();
      this.adminService.updateReportIssueData(reportIssueItem.id, reportIssueItem.hangerOrSectionNumber, reportIssueItem.issueDescription).then(results => {
        if (results.status === 200) {
          // this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit Report Issue Request Data', results.message, null);
          this.getReportIssueData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Edit Report Issue Request Data', results.message, null);
        }
      });
    }
  }

  public updateReportIssueCategory(reportIssueRequestId: string, reportIssueCategory: string) {
    this.adminService.updateReportIssueCategory(reportIssueRequestId, reportIssueCategory).then(results => {
      if (results.status !== 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Update Report Issue Category', results.message, null);
      }
    });
  }

  public updateReposrtIssuePriority(reportIssueRequestId: string, reportIssuePriority: string) {
    this.adminService.updateReportIssuePriority(reportIssueRequestId, reportIssuePriority).then(results => {
      if (results.status !== 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Update Report Issue Priority', results.message, null);
      }
    });
  }

  public updateReportIssuePersonResponsible(reportIssueRequestId: string, reportIssuePersonResponsible: string) {
    this.adminService.updateReportIssuePersonResponsible(reportIssueRequestId, reportIssuePersonResponsible).then(results => {
      if (results.status !== 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Update Report Issue Responsible Person', results.message, null);
      }
    });
  }

  public updateReportIssueStatus(reportIssueRequestId: string, reportIssueStatus: string) {
    this.adminService.updateReportIssueStatus(reportIssueRequestId, reportIssueStatus).then(results => {
      if (results.status !== 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Update Report Issue Status', results.message, null);
      }
    });
  }

  public deleteReportIssueRequestClicked(reportIssueRequest: GetReportIssueDataResponse.Requests) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Report Issue Request', `Are you sure you want to delete the Issue for ${reportIssueRequest.name}?`, null, this.deleteReportIssueRequest.bind(this, reportIssueRequest));
  }

  public deleteReportIssueRequest(reportIssueRequest: GetReportIssueDataResponse.Requests, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteReportIssueEntry(reportIssueRequest.id).then(results => {
        if (results.status === 200) {
          // this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Report Issue Request', results.message, null);
          this.getReportIssueData();
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Report Issue Request', results.message, null);
        }
      });
    }
  }

  public exportToExcel() {
    const dataForExcell = new Array<any>();

    this.reportIssueRequests.forEach(x => {
      if (!this.checkIfRowIsHidden(x)) {
        const priorityItem = this.priorityList.find(priority => priority.name === x.priority);
        const itemToPush = [
          x.id || '',
          x.dateAdded || '',
          x.name || '',
          x.hangerOrSectionNumber || '',
          x.issueDescription || '',
          x.category || '',

          priorityItem.name ? `${priorityItem.name} [${priorityItem.time || 'No Time Frame'}]` : '',

          x.personResponsible || '',
          StatusEnum[x.status] || ''
        ];


        dataForExcell.push(itemToPush);
      }
    });


    const fileName = 'Report Issue Requests';
    const headersData = ['ID', 'Date Captured', 'Name', 'Section', 'Issue Description', 'Category', 'Priority', 'Assignee', 'Status'];

    this.excelService.generateExcel(fileName, headersData, dataForExcell);
  }

}
