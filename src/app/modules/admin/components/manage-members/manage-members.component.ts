import { Component, OnInit } from '@angular/core';
import { MembersDataResponse } from 'src/app/models/get-members-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { EncryptionKeys, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { UpdateMembersRequest } from 'src/app/models/update-members-request.model';

import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent implements OnInit {
  public membersData = new Array<MembersDataResponse.Member>();

  // Is Registered Filtes
  public sortByIsRegistered = false;
  public allRegisteredCheckBox = true;
  public isRegisteredCheckBox = true;
  public isNotRegisteredCheckBox = true;

  // Is Admin Filtes
  public sortByIsAdmin = false;
  public allAdminCheckBox = true;
  public isNotAdminCheckBox = true;
  public isAdminCheckBox = true;

  // Getting to know you Filters
  public sortByHasCompletedGettingToKnowYou = false;
  public allHasCompletedGettingToKnowYouCheckBox = true;
  public hasNotCompletedGettingToKnowYouheckBox = true;
  public hasCompletedGettingToKnowYouCheckBox = true;

  constructor(public adminService: AdminService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getMembersData();

    // this.convertTestMembersData();
  }

  public getMembersData() {
    this.adminService.getMembersData().subscribe(results => {
      if (results.status === 200) {
        this.membersData = results.members;

        this.membersData.forEach(member => {
          member.hangarNumbersArray = member.hangarNumbers ? AppHelperFunction.splitStringToArray(member.hangarNumbers) : [];
          member.standNumbersArray = member.standNumbers ? AppHelperFunction.splitStringToArray(member.standNumbers) : [];
        });

      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Members data', results.message, null);
      }
    });
  }

  public delteMemberClicked(member: MembersDataResponse.Member) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Member', `Are you sure you want to delete ${member.name} ${member.surname} <br /> All data for the user will be deleted permanently.`, null, this.deleteMemberOutcome.bind(this, member.id));
  }

  public deleteMemberOutcome(userId: number, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteMember(userId).subscribe(results => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Delete Members', results.message, null);
        if (results.status === 200) {
          this.getMembersData();
        }
      });
    }
  }

  public addMemberClicked() {
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureMember, 'Add Members', 'Add', null, this.addMemberOutcome.bind(this));
  }

  public addMemberOutcome(modalOutcome: string, newMemberData: UpdateMembersRequest.RootObject) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.adminService.addNewMemberMember(newMemberData).subscribe(results => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Add Member', results.message, null);
        if (results.status === 200) {
          this.getMembersData();
          this.appModalService.CloseModal();
        }
      });
    }
  }

  public editMember(selectedMember: UpdateMembersRequest.RootObject) {
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureMember, 'Update Members', 'Update', selectedMember, this.editMemberOutcome.bind(this));
  }

  public editMemberOutcome(modalOutcome: string, newMemberData: UpdateMembersRequest.RootObject) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.adminService.manageMembersUpdateMemberData(newMemberData).subscribe(results => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Update Member', results.message, null);
        if (results.status === 200) {
          this.getMembersData();
          this.appModalService.CloseModal();
        }
      });
    }
  }

  public exportToExcel() {
    const standsForSaleExcelData = new Array<any>();
    this.membersData.forEach(item => {
      let itemToPush: any = {};
      itemToPush.ID = item.id;
      itemToPush.Name = item.name;
      itemToPush.Surname = item.surname;
      itemToPush.Email = item.email;
      itemToPush.PhoneNumber = item.phoneNumber;
      itemToPush.IsRegistered = item.isRegistered === 1 ? 'TRUE' : 'FALSE';
      itemToPush.IsAdmin = item.isAdmin === 1 || item.isAdmin === 2 ? 'TRUE' : 'FALSE';
      itemToPush.HasCompletedGettingToKnowYou = item.hasCompletedGettingToKnowYou === 1 ? 'TRUE' : 'FALSE';

      standsForSaleExcelData.push(itemToPush);
    });

    this.adminService.exportAsExcelFile(standsForSaleExcelData, 'Members');
  }

  public orderByIsRegisteredClicked() {
    this.sortByIsRegistered = !this.sortByIsRegistered;

    if (this.sortByIsRegistered) {
      this.membersData.sort((a, b) => a.isRegistered > b.isRegistered ? 1 : -1);
    } else {
      this.membersData.sort((a, b) => a.isRegistered > b.isRegistered ? -1 : 1);
    }
  }

  public allIsRegisteredClicked() {
    this.isRegisteredCheckBox = this.allRegisteredCheckBox;
    this.isNotRegisteredCheckBox = this.allRegisteredCheckBox;
  }

  public orderByIsAdminClicked() {
    this.sortByIsAdmin = !this.sortByIsAdmin;

    if (this.sortByIsAdmin) {
      this.membersData.sort((a, b) => a.isAdmin > b.isAdmin ? 1 : -1);
    } else {
      this.membersData.sort((a, b) => a.isAdmin > b.isAdmin ? -1 : 1);
    }
  }

  public allIsAdminClicked() {
    this.isNotAdminCheckBox = this.allRegisteredCheckBox;
    this.isAdminCheckBox = this.allRegisteredCheckBox;
  }

  public orderByHasCompletedGettingToKNowYouClicked() {
    this.sortByHasCompletedGettingToKnowYou = !this.sortByHasCompletedGettingToKnowYou;

    if (this.sortByHasCompletedGettingToKnowYou) {
      this.membersData.sort((a, b) => a.hasCompletedGettingToKnowYou > b.hasCompletedGettingToKnowYou ? 1 : -1);
    } else {
      this.membersData.sort((a, b) => a.hasCompletedGettingToKnowYou > b.hasCompletedGettingToKnowYou ? -1 : 1);
    }
  }

  public allHasCompletedGettingToKNowYouClicked() {
    this.hasCompletedGettingToKnowYouCheckBox = this.allHasCompletedGettingToKnowYouCheckBox;
    this.hasNotCompletedGettingToKnowYouheckBox = this.allHasCompletedGettingToKnowYouCheckBox;
  }

  public checkIfRowIsHidden(row: MembersDataResponse.Member) {
    if (row.isRegistered === 1 && !this.isRegisteredCheckBox) {
      return true
    }
    if (row.isRegistered === 0 && !this.isNotRegisteredCheckBox) {
      return true
    }

    if (row.isAdmin === 0 && !this.isNotAdminCheckBox) {
      return true
    }
    if (row.isRegistered > 0 && !this.isAdminCheckBox) {
      return true
    }

    if (row.hasCompletedGettingToKnowYou === 1 && !this.hasCompletedGettingToKnowYouCheckBox) {
      return true
    }
    if (row.hasCompletedGettingToKnowYou === 0 && !this.hasNotCompletedGettingToKnowYouheckBox) {
      return true
    }

    return false;
  }



}
