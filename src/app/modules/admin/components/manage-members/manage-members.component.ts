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

  // public membersTestData: MembersDataResponse.Member[] = [
    
  //   {
  //     "id": 55,
  //     "name": "Andre",
  //     "surname": "Kok",
  //     "email": "andre.kok97@outlook.com",
  //     "password": "8aHjByu4T3lke+VOCgDMjw==",
  //     "isRegistered": 1,
  //     "isAdmin": 1,
  //     "hasCompletedGettingToKnowYou": 0,
  //     "phoneNumber": "0605255551",
  //     "hangarNumbers": "[\"Not Applicable\"]",
  //     "standNumbers": "[\"Not Applicable\"]"
  //   }
  // ];

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


  // public convertTestMembersData() {
  //   this.membersTestData.forEach(member => {
  //     if (member.password) {
  //       member.newPassword = this.decryptPassword(member.password);
  //     }
  //   });

  //   console.log('DATA AFTER ALTERING: ', this.membersTestData);

  //   // this.membersTestData.forEach(member => {
  //   //   // setTimeout(() => {
  //   //     this.adminService.addExistingMember(member).subscribe(results => {
  //   //       this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Update Member', results.message, null);
  //   //     });
  //   //   // }, 1000);
  //   // });
  // }

  // public decryptPassword(password: string) {
  //   const keyHex = CryptoJS.enc.Hex.parse(EncryptionKeys.LoginPasswordEncryptionKey);
  //   const ivHex = CryptoJS.enc.Hex.parse(EncryptionKeys.LoginPasswordEncryptionKey);
  //   const decryptedBytes = CryptoJS.AES.decrypt(password, keyHex, { iv: ivHex });
  //   const dectyptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
  //   return dectyptedString;
  // }

}
