import { Component, OnInit } from '@angular/core';
import { MembersDataResponse } from 'src/app/models/get-members-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction } from 'src/app/helpers/app-helper.functions';
import { UpdateMembersRequest } from 'src/app/models/update-members-request.model';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent implements OnInit {
  public membersData = new Array<MembersDataResponse.Member>();

  constructor(public adminService: AdminService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.getMembersData();
  }

  public getMembersData() {
    this.adminService.getMembersData().then(results => {
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
      this.adminService.deleteMember(userId).then(results => {
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
    console.log('MODAL OUTCOME: ', modalOutcome);
    if (modalOutcome === ModalOutcomeOptions.Update) {
      console.log('NEW MEMBER DATA: ', newMemberData);
      this.adminService.addNewMemberMember(newMemberData).then(results => {
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
    console.log('MODAL OUTCOME: ', modalOutcome);
    if (modalOutcome === ModalOutcomeOptions.Update) {
      console.log('NEW MEMBER DATA: ', newMemberData);
      this.adminService.manageMembersUpdateMemberData(newMemberData).then(results => {
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
      itemToPush.IsRegistered = item.isRegistered === '1' ? 'TRUE' : 'FALSE';
      itemToPush.IsAdmin = item.isAdmin === '1' ? 'TRUE' : 'FALSE';
      itemToPush.HasCompletedGettingToKnowYou = item.hasCompletedGettingToKnowYou === '1' ? 'TRUE' : 'FALSE';

      standsForSaleExcelData.push(itemToPush);
    });

    this.adminService.exportAsExcelFile(standsForSaleExcelData, 'Members');
  }

}
