import { Component, OnInit } from '@angular/core';
import { ModalOutcomeOptions, ModalTypes, UserDataInTokenToReturn } from 'src/app/enums/app.enums';
import { GetReportIssueDataResponse } from 'src/app/models/get-report-issue-data-response.model';
import { ExcelService } from 'src/app/modules/shared/services/excel.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { TokenService } from 'src/app/services/token/token.service';
import { AdminService } from '../../services/admin.service';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatMenu } from '@angular/material/menu';

export enum StatusEnum {
  notStarted = "Not Started",
  inProgress = "In Progress",
  toBeReleased = "To be Released",
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
  public reportIssueFormGroup: FormGroup;

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
  public statusToBeReleasedCheckBox = true;
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

  // ETC Filters
  public sortAlphabeticalByDate = false;
  public sortAlphabeticalByDaysToOs = false;

  public menuInterval: any;
  public menuOpenedButton: any;
  public menuOpenedItem: any;

  constructor(private adminService: AdminService,
    private appModalService: AppModalService,
    public tokenService: TokenService,
    public excelService: ExcelService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeControls();
    this.getReportIssueData();
    this.checkIfAdminIsAllowedToDelete();
  }

  private initializeControls() {
    this.reportIssueFormGroup = this.fb.group({
      filterControl: new FormControl('')
    });
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

        const currentDate = new Date();

        this.propertyNumbersList = new Array<GetReportIssueDataResponse.PropertyNumber>();
        this.reportIssueRequests.forEach(request => {
          if (!this.propertyNumbersList.find(x => x.description?.toLowerCase()?.trim() === request.hangerOrSectionNumber?.toLowerCase()?.trim())) {
            const itemToPush = new GetReportIssueDataResponse.PropertyNumber();
            itemToPush.description = request.hangerOrSectionNumber;
            itemToPush.isFilterSelected = true;
            this.propertyNumbersList.push(itemToPush);
          }

          // Add # Days remaining to OS
          if (request.estimatedCompletionDate) {
            // let date1 = new Date();
            let date2 = new Date(request.estimatedCompletionDate + 'T23:59:59');

            // Calculating the time difference
            // of two dates
            let Difference_In_Time =
              date2.getTime() - currentDate.getTime();

            // Calculating the no. of days between
            // two dates
            let Difference_In_Days =
              Math.round
                (Difference_In_Time / (1000 * 3600 * 24));

            request.numOfRemainingDaysToETC = Difference_In_Days;
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

        this.filterTickets();

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
    if (row.status === 'toBeReleased' && !this.statusToBeReleasedCheckBox) {
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

    // Check for search values
    if (this.filterControl?.value && !row.isFilteredOnSearch) {
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
    this.statusToBeReleasedCheckBox = this.allStatusCheckBox;
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

  public orderDataByETCDate() {
    this.sortAlphabeticalByDate = !this.sortAlphabeticalByDate;

    if (this.sortAlphabeticalByDate) {
      this.reportIssueRequests.sort((a, b) => (a.estimatedCompletionDate ? +a.estimatedCompletionDate.replaceAll('-', '') : 99999999) >= (b.estimatedCompletionDate ? +b.estimatedCompletionDate.replaceAll('-', '') : 99999999) ? 1 : -1);
    } else {
      this.reportIssueRequests.sort((a, b) => (a.estimatedCompletionDate ? +a.estimatedCompletionDate.replaceAll('-', '') : 99999999) >= (b.estimatedCompletionDate ? +b.estimatedCompletionDate.replaceAll('-', '') : 99999999) ? -1 : 1);
    }
  }

  public orderDataByDaysToOS() {
    this.sortAlphabeticalByDaysToOs = !this.sortAlphabeticalByDaysToOs;


    if (this.sortAlphabeticalByDaysToOs) {
      this.reportIssueRequests.sort((a, b) => (a.numOfRemainingDaysToETC !== undefined && a.numOfRemainingDaysToETC !== null ? a.numOfRemainingDaysToETC : 99999999) >= (b.numOfRemainingDaysToETC !== undefined && b.numOfRemainingDaysToETC !== null ? b.numOfRemainingDaysToETC : 99999999) ? 1 : -1);
    } else {
      this.reportIssueRequests.sort((a, b) => (a.numOfRemainingDaysToETC !== undefined && a.numOfRemainingDaysToETC !== null ? a.numOfRemainingDaysToETC : -99999999) >= (b.numOfRemainingDaysToETC !== undefined && b.numOfRemainingDaysToETC !== null ? b.numOfRemainingDaysToETC : -99999999) ? -1 : 1);
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
    this.statusToBeReleasedCheckBox = false;
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
    this.statusToBeReleasedCheckBox = true;
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
          // this.getReportIssueData();
          this.reportIssueRequests.find(x => x.id === reportIssueItem.id).hangerOrSectionNumber = reportIssueItem.hangerOrSectionNumber;
          this.reportIssueRequests.find(x => x.id === reportIssueItem.id).issueDescription = reportIssueItem.issueDescription;
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

  public estimatedCompletionDateChanged(newDate: string, reportIssueRequestId: string) {
    this.reportIssueRequests.find(x => x.id === reportIssueRequestId).estimatedCompletionDate = newDate;

    const currentDate = new Date();
    let date2 = new Date(newDate + 'T23:59:59');

    let Difference_In_Time =
      date2.getTime() - currentDate.getTime();

    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    this.reportIssueRequests.find(x => x.id === reportIssueRequestId).numOfRemainingDaysToETC = Difference_In_Days;

    this.adminService.updateReportIssueEstimatedCompletionDate(reportIssueRequestId, newDate).then(results => {
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
          // this.getReportIssueData();
          this.reportIssueRequests = this.reportIssueRequests.filter(x => x.id !== reportIssueRequest.id);
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

          priorityItem?.name ? `${priorityItem.name} [${priorityItem.time || 'No Time Frame'}]` : '',

          x.personResponsible || '',
          StatusEnum[x.status] || '',
          x.estimatedCompletionDate || '',
          x.statusDateChanged,
        ];

        dataForExcell.push(itemToPush);
      }
    });


    const fileName = 'Report Issue Requests';
    const headersData = ['ID', 'Date Captured', 'Name', 'Section', 'Issue Description', 'Category', 'Priority', 'Assignee', 'Status', 'ETC', 'Last Date Status Changed'];

    this.excelService.generateExcel(fileName, headersData, dataForExcell);
  }

  public async filterTickets() {
    const filterValue = this.filterControl.value;

    this.reportIssueRequests.forEach(x => {
      x.isFilteredOnSearch = false;
    });

    if (!filterValue) {
      return;
    }

    this.reportIssueRequests.filter(x => x.id?.toString()?.includes(filterValue?.toString()))?.forEach(x => {
      x.isFilteredOnSearch = true;
    });

    this.reportIssueRequests.filter(x => x.issueDescription?.toString()?.toLowerCase()?.includes(filterValue?.toString()?.toLowerCase()))?.forEach(x => {
      x.isFilteredOnSearch = true;
    });
  }

  public clearSearchField() {
    this.filterControl.setValue('');
    this.filterControl.reset();
    this.filterTickets();
  }

  public highlightSearchText(textToHightlight: string) {
    if (!this.filterControl.value) {
      return textToHightlight;
    }
    return textToHightlight.replace(new RegExp(this.filterControl.value, 'gi'), match => {
      return '<span class="highlight-text">' + match + '</span>';
    });
  }

  public get filterControl() {
    return this.reportIssueFormGroup.get('filterControl');
  }









  public menuOpened(menuOpenedId: string) {
    this.menuOpenedButton = document.getElementById(`${menuOpenedId}Button`);
    this.menuOpenedItem = document.getElementById(menuOpenedId);
    if (this.menuOpenedItem) {
      this.startMenuTimer();
      // this.menuOpenedItem.addEventListener('click', () => this.resetMenuTimer(false));
    }
  }

  public startMenuTimer() {
    this.menuInterval = setInterval(() => {
      this.menuOpenedButton.click();
      this.resetMenuTimer(true);
    }, 3000);
  }

  public resetMenuTimer(isStopTimer: boolean) {
    clearInterval(this.menuInterval);



    if (!isStopTimer) {
      this.startMenuTimer();
    }
  }

  public menuClosed(menuOpenedId: string) {
    if (this.menuOpenedItem) {
      // this.menuOpenedItem.removeEventListener('click', () => this.resetMenuTimer(true));
      this.resetMenuTimer(true);
      this.menuOpenedButton = null;
      this.menuOpenedItem = null;
    }
  }

}
