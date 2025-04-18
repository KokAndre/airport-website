import { Component, OnInit } from '@angular/core';
import { Endpoints, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetGettingToKnowYouResponse } from 'src/app/models/get-getting-to-know-you-response.model';
import { MembersService } from 'src/app/modules/members/services/members.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-getting-to-know-you',
  templateUrl: './manage-getting-to-know-you.component.html',
  styleUrls: ['./manage-getting-to-know-you.component.scss']
})
export class ManageGettingToKnowYouComponent implements OnInit {
  public membersData = new Array<GetGettingToKnowYouResponse.Member>();
  public submitItemSucessId: number;

  constructor(public appModalService: AppModalService, public membersService: MembersService, public adminService: AdminService) { }

  ngOnInit() {
    this.getUsersData();
  }

  public getUsersData() {
    this.membersService.getGettingToKnowYouData().then((results) => {
      if (results.status === 200) {
        this.formatData(results.member);
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, "Get Who's who in the Tedderfield Zoo", results.message, null);
      }
    });
  }

  public formatData(membersResponseData: any[]) {
    this.membersData = new Array<GetGettingToKnowYouResponse.Member>();

    membersResponseData.forEach(member => {
      const itemToPush = new GetGettingToKnowYouResponse.Member();
      itemToPush.id = member.id;
      itemToPush.userId = member.userId;
      itemToPush.name = member.name;
      itemToPush.email = member.email;
      itemToPush.phoneNumber = member.phoneNumber;
      itemToPush.emergencyContactOneName = member.emergencyContactOneName;
      itemToPush.emergencyContactOnePhoneNumber = member.emergencyContactOnePhoneNumber;
      itemToPush.emergencyContactTwoName = member.emergencyContactTwoName;
      itemToPush.emergencyContactTwoPhoneNumber = member.emergencyContactTwoPhoneNumber;
      itemToPush.whereWereYouBorn = member.whereWereYouBorn;
      itemToPush.howFarDoYouDrive = member.howFarDoYouDrive;
      itemToPush.iFlyBecause = member.iFlyBecause?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replaceAll("`", "'")?.split(',');
      itemToPush.iLoveTedderfield = member.iLoveTedderfield?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replaceAll("`", "'")?.split(',');
      itemToPush.whenIAmNotFlying = member.whenIAmNotFlying?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replaceAll("`", "'")?.split(',');
      itemToPush.whoInspiresYou = member.whoInspiresYou?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replaceAll("`", "'")?.split(',');
      itemToPush.whatStressesYouMost = member.whatStressesYouMost?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replaceAll("`", "'")?.split(',');
      itemToPush.yourMostUsefullTalent = member.yourMostUsefullTalent?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replaceAll("`", "'")?.split(',');
      itemToPush.immediateFamily = member.immediateFamily?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.replaceAll("`", "'")?.split(',');

      itemToPush.image = new GetGettingToKnowYouResponse.Image();
      itemToPush.image.fileName = member.image;
      itemToPush.image.fileData = Endpoints.GettingoKnowYouImagesBaseURL + member.id + '/' + member.image;

      this.membersData.push(itemToPush);
    });
  }

  public editGettingToKnowYouDataClicked(gettingToKnowYouItem: GetGettingToKnowYouResponse.Member) {
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureGettingToKnowYouData, 'Edit Data', '', JSON.parse(JSON.stringify(gettingToKnowYouItem)), this.editGettingToKnowYouDataOutcome.bind(this));
  }

  public editGettingToKnowYouDataOutcome(modalOutcome: string, gettingToKnowYouItem: GetGettingToKnowYouResponse.Member) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.updateGettingToKnowYouData(gettingToKnowYouItem);
    }
  }

  public updateGettingToKnowYouData(gettingToKnowYouItem: GetGettingToKnowYouResponse.Member) {
    this.membersService.submitGettingToKnowYou(gettingToKnowYouItem, true).then(results => {
      if (results.status === 200) {
        this.submitItemSucessId = results.id;
        this.appModalService.CloseModal();

        const originalHasCompletedGettingToKnowYouData = this.membersData.find(x => x.id === gettingToKnowYouItem.id);

        // Update the member data:
        this.getUsersData();

        if (originalHasCompletedGettingToKnowYouData.image.fileName !== gettingToKnowYouItem.image.fileName) {
          this.uploadImage(gettingToKnowYouItem);
        } else {
          this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Getting To Know You', 'Data has successfully been updated.', null);
        }
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Getting To Know You', results.message, null);
      }
    });
  }

  public uploadImage(gettingToKnowYouItem: GetGettingToKnowYouResponse.Member) {
    this.membersService.uploadGettingToKnowImage(this.submitItemSucessId, gettingToKnowYouItem.image).then(results => {
      if (results.status === 200) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Getting To Know You', 'Data has successfully been updated.', null);
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Getting To Know You', results.message, null);
      }
    });
  }

  public exportToExcel() {
    const membersDataExcelData = new Array<any>();
    this.membersData.forEach(member => {
      let itemToPush: any = {};
      itemToPush.ID = member.id;
      itemToPush.Name = member.name;
      itemToPush.Email = member.email;
      itemToPush.PhoneNumber = member.phoneNumber;
      itemToPush.EmergencyContactOneName = member.emergencyContactOneName;
      itemToPush.EmergencyContactOnePhoneNumber = member.emergencyContactOnePhoneNumber;
      itemToPush.EmergencyContactTwoName = member.emergencyContactTwoName;
      itemToPush.EmergencyContactTwoPhoneNumber = member.emergencyContactTwoPhoneNumber;
      itemToPush.WhereWereYouBorn = member.whereWereYouBorn;
      itemToPush.HowFarDoYouDrive = member.howFarDoYouDrive;
      itemToPush.IFlyBecause = member.iFlyBecause.toString();
      itemToPush.ILoveTedderfield = member.iLoveTedderfield.toString();
      itemToPush.WhenIAmNotFlying = member.whenIAmNotFlying.toString();
      itemToPush.WhoInspiresYou = member.whoInspiresYou.toString();
      itemToPush.WhatStressesYouMost = member.whatStressesYouMost.toString();
      itemToPush.YourMostUsefullTalent = member.yourMostUsefullTalent.toString();
      itemToPush.ImmediateFamily = member.immediateFamily.toString();
      itemToPush.Image = member.image.fileName;

      membersDataExcelData.push(itemToPush);
    });

    this.adminService.exportAsExcelFile(membersDataExcelData, 'Getting To Know You');
  }


}
