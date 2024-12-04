import { Component, OnInit } from '@angular/core';
import { MembersDataResponse } from 'src/app/models/get-members-response.model';
import { AdminService } from '../../services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalTypes } from 'src/app/enums/app.enums';

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
        this.membersData = results.members
      } else {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Get Members data', results.message, null);
      }
    });
  }

  public delteMember(member: MembersDataResponse.Member) {
    //
  }

  public editMember(member: MembersDataResponse.Member) {
    //
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
