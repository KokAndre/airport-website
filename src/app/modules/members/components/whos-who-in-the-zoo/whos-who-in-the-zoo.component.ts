import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { Endpoints, ModalTypes } from 'src/app/enums/app.enums';
import { GetGettingToKnowYouResponse } from 'src/app/models/get-getting-to-know-you-response.model';

@Component({
  selector: 'app-whos-who-in-the-zoo',
  templateUrl: './whos-who-in-the-zoo.component.html',
  styleUrls: ['./whos-who-in-the-zoo.component.scss']
})
export class WhosWhoInTheZooComponent implements OnInit {
  public isWelcomeExpanded = true;
  public isUsersDetailsExpanded = true;
  public isMemberDetailsExpanded = true;
  public membersData = new Array<GetGettingToKnowYouResponse.Member>();
  public mainPageScrollPosition = 0;
  public memberDetailsToDisplay: GetGettingToKnowYouResponse.Member;
  public displayMemberDetails = false;

  constructor(public membersService: MembersService, public appModalService: AppModalService) { }

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
      itemToPush.iFlyBecause = member.iFlyBecause?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.iLoveTedderfield = member.iLoveTedderfield?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.whenIAmNotFlying = member.whenIAmNotFlying?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.whoInspiresYou = member.whoInspiresYou?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.whatStressesYouMost = member.whatStressesYouMost?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.yourMostUsefullTalent = member.yourMostUsefullTalent?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      itemToPush.immediateFamily = member.immediateFamily?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');

      itemToPush.image = new GetGettingToKnowYouResponse.Image();
      itemToPush.image.fileName = member.image;
      itemToPush.image.fileData = Endpoints.GettingoKnowYouImagesBaseURL + member.id + '/' + member.image;

      this.membersData.push(itemToPush);
    });
  }

  public viewMemberDetails(member: GetGettingToKnowYouResponse.Member) {
    this.mainPageScrollPosition = document.getElementById('content-container').scrollTop;

    this.memberDetailsToDisplay = member;
    this.displayMemberDetails = true;

    document.getElementById('content-container').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public backClicked() {
    this.displayMemberDetails = false;
    this.memberDetailsToDisplay = new GetGettingToKnowYouResponse.Member();

    document.getElementById('content-container').scroll({
      top: this.mainPageScrollPosition,
      left: 0,
      behavior: 'smooth'
    });
  }

}
