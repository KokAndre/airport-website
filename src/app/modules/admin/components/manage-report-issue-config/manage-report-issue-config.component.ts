import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetReportIssueDataResponse } from 'src/app/models/get-report-issue-data-response.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-manage-report-issue-config',
  templateUrl: './manage-report-issue-config.component.html',
  styleUrls: ['./manage-report-issue-config.component.scss']
})
export class ManageReportIssueConfigComponent implements OnInit {
  public isCategoryExpanded = true;
  public isPersonResponsibleExpanded = true;
  public categoryList: GetReportIssueDataResponse.Category[];
  public responsiblePersonList: GetReportIssueDataResponse.ResponsiblePerson[];

  constructor(public adminService: AdminService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getManageReportIssueConfig();
  }

  public getManageReportIssueConfig() {
    this.adminService.getReportIssueData().then((results: GetReportIssueDataResponse.RootObject) => {
      if (results.status === 200) {
        this.categoryList = results.categories;
        this.responsiblePersonList = results.resposiblePersons;
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Report Issue Config', results.message, null);
      }
    });
  }

  public deleteCategoryClicked(category: GetReportIssueDataResponse.Category) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Category', `Are you sure you want to delete the following category: </br> ${category.category}?`, null, this.deleteCategoryOutcome.bind(this, category));
  }

  public deleteCategoryOutcome(category: GetReportIssueDataResponse.Category, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteIssueCategory(category.id).then(results => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Category', results.message, null);
        if (results.status === 200) {
          this.getManageReportIssueConfig();
        }
      });
    }
  }

  public addCategoryClicked() {
    this.appModalService.ShowConfirmationModal(ModalTypes.CapturSingleInputField, 'Add Category', 'Category', null, this.addCategoryOutcome.bind(this));
  }

  public addCategoryOutcome(modalOutcome: string, category: string) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.adminService.addIssueCategory(category).then(results => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Add Category', results.message, null);
        if (results.status === 200) {
          this.getManageReportIssueConfig();
        }
      });
    }
  }

  public deletePersonResponsibleClicked(person: GetReportIssueDataResponse.ResponsiblePerson) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Person Responsible', `Are you sure you want to delete the following person: </br> ${person.name}?`, null, this.deletePersonResponsibleOutcome.bind(this, person));
  }

  public deletePersonResponsibleOutcome(person: GetReportIssueDataResponse.ResponsiblePerson, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteIssueResponsiblePerson(person.id).then(results => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Responsible Person', results.message, null);
        if (results.status === 200) {
          this.getManageReportIssueConfig();
        }
      });
    }
  }
  
  public addPersonResponsibleClicked() {
    this.appModalService.ShowConfirmationModal(ModalTypes.CapturSingleInputField, 'Add Person Responsible', 'Person Responsible', null, this.addPersonResponsibleOutcome.bind(this));
  }

  public addPersonResponsibleOutcome(modalOutcome: string, name: string) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.adminService.addIssuePersonResponsible(name).then(results => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Add Person Responsible', results.message, null);
        if (results.status === 200) {
          this.getManageReportIssueConfig();
        }
      });
    }
  }

}
