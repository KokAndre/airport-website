import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { ModalDetails } from 'src/app/models/app-modal.model';
import { GetGalleryDataResponse } from 'src/app/models/get-gallery-data-response.model';
import { GetReportIssueDataResponse } from 'src/app/models/get-report-issue-data-response.model';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';
import { GetWebTicketsDataResponse } from 'src/app/models/get-web-tickets-data-response.model';
import { SubmitInterestedInPropertyRequest } from 'src/app/models/submit-interested-in-property-request.model';
import { UpdateMembersRequest } from 'src/app/models/update-members-request.model';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements OnInit {
  public isLoading = true;
  public modalTypesEnum = ModalTypes;
  public modalOutcomeOptions = ModalOutcomeOptions;
  public gallerySectionToEditData: GetGalleryDataResponse.Section;
  public interestedInPropertyFormGroup: FormGroup;
  public folderName = '';
  public hideBannerModal = false;
  public bannerPDFHeight = '40vh';
  public bannerPDFWidth: string;
  public editReportIssueData: GetReportIssueDataResponse.Requests;
  public captureMemberFormGroup: FormGroup;
  public memberData: UpdateMembersRequest.RootObject;
  public captureSingleFieldData: string;
  public capturePriorityData: GetReportIssueDataResponse.priorityList;
  public webTicketData: GetWebTicketsDataResponse.WebTicket;
  public sectionsData: GetWebTicketsDataResponse.Section[];
  public pageDisplayData: GetWebTicketsDataResponse.Page[];
  public priorityData: GetWebTicketsDataResponse.Priority[];
  public statusData: GetWebTicketsDataResponse.Status[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalDetails, public formBuilder: FormBuilder, public tokenService: TokenService) { }

  ngOnInit() {
    this.initializeModalData();

    if (window.innerWidth < 700) {
      this.bannerPDFHeight = '40vh';
    } else {
      this.bannerPDFHeight = '80vh';
    }
  }

  public initializeModalData() {
    switch (this.data.type) {
      case ModalTypes.CaptureGallerySectionTitle:
        if (this.data.inputValues) {
          this.gallerySectionToEditData = this.data.inputValues;
        } else {
          this.gallerySectionToEditData = new GetGalleryDataResponse.Section;
          this.gallerySectionToEditData.images = new Array<GetGalleryDataResponse.Image>;
        }
        this.isLoading = false;
        break;

      case ModalTypes.InterestedInPropertyModal:
        this.initializeInterestedInPropertyFormControls();
        break;

      case ModalTypes.AddFolderModal:
        if (this.data.details) {
          this.folderName = this.data.details;
        }
        this.isLoading = false;
        break;

      case ModalTypes.EditReportIssueData:
        if (this.data.inputValues) {
          this.editReportIssueData = this.data.inputValues;
        } else {
          this.editReportIssueData = new GetReportIssueDataResponse.Requests;
        }
        this.isLoading = false;
        break;

      case ModalTypes.CaptureMember:
        if (this.data.inputValues) {
          this.memberData = this.data.inputValues;
        } else {
          this.memberData = new UpdateMembersRequest.RootObject();
        }

        this.initializeCaptureMemberFormControls();
        break;

      case ModalTypes.CapturePriorityData:
        if (this.data.inputValues) {
          this.capturePriorityData = this.data.inputValues;
        } else {
          this.capturePriorityData = new GetReportIssueDataResponse.priorityList();
        }

        this.isLoading = false;
        break;

      case ModalTypes.CaptureWebTicketData:
        this.sectionsData = this.data.inputValues?.sections;
        this.priorityData = this.data.inputValues?.priorities;
        this.statusData = this.data.inputValues?.statusList;

        if (this.data.inputValues?.webTicket) {
          this.webTicketData = this.data.inputValues.webTicket;
        } else {
          this.webTicketData = new GetWebTicketsDataResponse.WebTicket();
        }

        if (this.webTicketData?.section) {
          this.pageDisplayData = this.sectionsData.find(x => x.name === this.webTicketData.section)?.pages;
        }

        this.isLoading = false;
        break;

      default:
        this.isLoading = false;
        break;
    }
  }

  public confirmGallerySectionChanges() {
    if (this.gallerySectionToEditData.title) {
      this.data.callbackMessageResult(ModalOutcomeOptions.Update, this.gallerySectionToEditData);
    }
  }

  public updateReportIssueData() {
    if (this.editReportIssueData.hangerOrSectionNumber && this.editReportIssueData.issueDescription) {
      this.data.callbackMessageResult(ModalOutcomeOptions.Update, this.editReportIssueData);
    }
  }

  public addFolderConfirmClicked() {
    if (this.folderName) {
      this.data.callbackMessageResult(ModalOutcomeOptions.Update, this.folderName);
    }
  }

  public initializeInterestedInPropertyFormControls() {
    this.interestedInPropertyFormGroup = this.formBuilder.group({
      interestedInPropertyNameControl: new FormControl('', [Validators.required]),
      interestedInPropertyEmailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      interestedInPropertyPhoneNumberControl: new FormControl('', [Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')])
    });

    this.checkIfUserIsLoggedIn();

    this.isLoading = false;
  }

  public initializeCaptureMemberFormControls() {
    this.captureMemberFormGroup = this.formBuilder.group({
      captureMemberNameControl: new FormControl(this.memberData.name || '', [Validators.required]),
      captureMemberSurnameControl: new FormControl(this.memberData.surname || '', [Validators.required]),
      captureMemberPhoneNumberControl: new FormControl(this.memberData.phoneNumber || '', [Validators.required, Validators.maxLength(10), Validators.pattern('^0[1-9]{1}[0-9]{1}[0-9]{7}$')]),
      captureMemberEmailControl: new FormControl(this.memberData.email || '', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      captureMemberHangarNumbersControl: new FormControl(''),
      captureMemberStandNumbersControl: new FormControl(''),
      captureMemberIsAdminControl: new FormControl(this.memberData.isAdmin || '0', [Validators.required])
    });

    const hangarDataToSet = this.memberData.hangarNumbers?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
    this.captureMemberHangarNumbersControl.setValue(this.formatBulletPointInputDataForPrePopulation(hangarDataToSet) || '');

    if (this.memberData.standNumbers?.length) {
      const standDataToSet = this.memberData.standNumbers?.replaceAll('\\', '')?.replaceAll('[', '')?.replaceAll(']', '')?.replaceAll('"', '')?.split(',');
      this.captureMemberStandNumbersControl.setValue(this.formatBulletPointInputDataForPrePopulation(standDataToSet) || '');
    }


    this.isLoading = false;
  }

  public formatBulletPointInputDataForPrePopulation(itemArray: string[]) {
    if (itemArray?.length) {
      let formattedItem = '';
      itemArray.forEach(item => {
        item = item.replaceAll("`", "'");
        if (item) {
          if (formattedItem) {
            formattedItem += `\n• ${item}`;
          } else {
            formattedItem += `• ${item}`;
          }
        }


      });
      return formattedItem;
    } else {
      return '';
    }
  }

  public keydownOnBulletPointControl(formControl?: AbstractControl) {
    if (!formControl.value) {
      formControl.setValue('• ');
    }
  }

  public inputOnBulletPointControl(formControl: AbstractControl, keyPressed: any) {
    if (!formControl.value) {
      formControl.setValue('• ');
    }

    const numOfLines = formControl.value?.split('\n')?.length;

    // Check that no text is placed before the bullet points
    const allLinesArray = formControl.value?.split('\n');
    if (allLinesArray.find(x => x.slice(0, 1) !== '•')) {
      let newValueToSetAfterRemovingBulletPreText = '';

      allLinesArray.forEach((line, last) => {
        if (line.slice(0, 1) !== '•') {
          const bulletPointIndex = line.lastIndexOf('•');
          const newValueToSet = line.slice(bulletPointIndex, line.length);

          if (last) {
            newValueToSetAfterRemovingBulletPreText += newValueToSet;
          } else {
            newValueToSetAfterRemovingBulletPreText += newValueToSet + '\n';
          }
        } else {
          if (last) {
            newValueToSetAfterRemovingBulletPreText += line;
          } else {
            newValueToSetAfterRemovingBulletPreText += line + '\n';
          }
        }

        formControl.setValue(newValueToSetAfterRemovingBulletPreText);
      });
    }

    if (allLinesArray.find(x => !x.includes('•'))) {
      let newValueToSetAfterRemovingBulletPreText = '';
      allLinesArray.forEach((line, last) => {
        if (!line.includes('•')) {

          if (last) {
            newValueToSetAfterRemovingBulletPreText += '• ' + line;
          } else {
            newValueToSetAfterRemovingBulletPreText += '• ' + line + '\n';
          }
        } else {
          if (last) {
            newValueToSetAfterRemovingBulletPreText += line;
          } else {
            newValueToSetAfterRemovingBulletPreText += line + '\n';
          }
        }

        formControl.setValue(newValueToSetAfterRemovingBulletPreText);
      });
    }

    if (keyPressed.keyCode === '13' || keyPressed.keyCode === 13 || keyPressed.key === 'Enter') {
      if (numOfLines <= 10) {
        let formCotrolValue = formControl.value;
        formCotrolValue += '• ';
        formControl.setValue(formCotrolValue);
      } else {
        let formCotrolValue = formControl.value;
        const lastIndex = formCotrolValue.lastIndexOf('\n');
        formCotrolValue = formCotrolValue.substr(0, lastIndex);
        formControl.setValue(formCotrolValue);
      }
    }

    // if (keyPressed.key === ',') {
    //   if (numOfLines < 10) {
    //     let formCotrolValue = formControl.value;
    //     formCotrolValue = formCotrolValue.replace(',', "\n")
    //     formCotrolValue += '• ';
    //     formControl.setValue(formCotrolValue);
    //   } else {
    //     let formCotrolValue = formControl.value;
    //     const lastIndex = formCotrolValue.lastIndexOf(',');
    //     formCotrolValue = formCotrolValue.substr(0, lastIndex);
    //     formControl.setValue(formCotrolValue);
    //   }
    // }

  }

  public blurOnBulletPointControl(formControl: AbstractControl) {
    if (formControl?.value === '• ' || formControl?.value === '•') {
      formControl.setValue('');
    }
  }

  public formatBulletPointInputValuesToSubmit(valueToFormat: string) {
    let arrayOfInputValue = valueToFormat.split('\n');
    arrayOfInputValue = arrayOfInputValue.map(line => {
      line = line.replaceAll('•', '');
      line = line.trim();
      line = line.replaceAll("'", "`");
      return line;
    });
    arrayOfInputValue = arrayOfInputValue.filter(x => x !== '');

    return arrayOfInputValue;
  }

  public updateMemberData() {
    const memberDataToUpdate = new UpdateMembersRequest.RootObject();
    memberDataToUpdate.id = this.memberData.id;
    memberDataToUpdate.name = this.captureMemberNameControl.value;
    memberDataToUpdate.surname = this.captureMemberSurnameControl.value;
    memberDataToUpdate.email = this.captureMemberEmailControl.value;
    memberDataToUpdate.phoneNumber = this.captureMemberPhoneNumberControl.value;
    memberDataToUpdate.isAdmin = this.captureMemberIsAdminControl.value;

    memberDataToUpdate.hangarNumbersArray = this.formatBulletPointInputValuesToSubmit(this.captureMemberHangarNumbersControl.value);
    memberDataToUpdate.standNumbersArray = this.formatBulletPointInputValuesToSubmit(this.captureMemberStandNumbersControl.value);

    this.data.callbackMessageResult(ModalOutcomeOptions.Update, memberDataToUpdate);
  }

  public updateSinglrFieldData() {
    this.data.callbackMessageResult(ModalOutcomeOptions.Update, this.captureSingleFieldData);
  }

  public updatePriorityData() {
    this.data.callbackMessageResult(ModalOutcomeOptions.Update, this.capturePriorityData);
  }

  public checkIfUserIsLoggedIn() {
    const userDetails = this.tokenService.getUserData() as GetUserDataResponse.Data;
    if (userDetails) {
      if (userDetails.name && userDetails.surname) {
        this.interestedInPropertyNameControl.setValue(`${userDetails.name} ${userDetails.surname}`);
      }

      if (userDetails.email) {
        this.interestedInPropertyEmailControl.setValue(userDetails.email);
      }

      if (userDetails.phoneNumber) {
        this.interestedInPropertyPhoneNumberControl.setValue(userDetails.phoneNumber);
      }
    }
  }

  public downloadDocument() {
    if (this.data.title && this.data.details) {
      fetch(this.data.details)
        .then(response => response.blob())
        .then(blob => {

          // Create new blob to add content type
          const pdfBlob = new Blob([blob], { type: 'application/pdf' });
          // Create the url to open the blob in a new window
          const data = window.URL.createObjectURL(pdfBlob);

          // Create an a tag to download the file
          const link = document.createElement('a');
          link.href = data;
          link.download = this.data.title;
          link.click();
        });
    }
  }

  public submitInterestedInPropertyForm() {
    const returnData = new SubmitInterestedInPropertyRequest();

    returnData.name = this.interestedInPropertyNameControl.value;
    returnData.email = this.interestedInPropertyEmailControl.value;
    returnData.phoneNumber = this.interestedInPropertyPhoneNumberControl.value;

    this.data.callbackMessageResult(ModalOutcomeOptions.Confirm, returnData);
  }

  bannerLoaded() {
    const pageElemntArr = document.getElementById('banner-pdf-viewer').children[0].children[0].children;
    this.bannerPDFHeight = pageElemntArr[0]?.clientHeight ? `${pageElemntArr[0].clientHeight}px` : '80vh';
    this.hideBannerModal = false;
  }

  public webTicketCategoryChanged() {
    if (this.webTicketData.category === 'Administration') {
      this.webTicketData.section = 'Administration';
      this.webTicketData.page = 'Administration';
    }

    if (this.webTicketData.category === 'Web Development') {
      this.webTicketData.section = '';
      this.webTicketData.page = undefined;
      this.pageDisplayData = [];
    }
  }

  public webTicketSectionChanged() {
    this.pageDisplayData = this.sectionsData.find(x => x.name === this.webTicketData.section)?.pages;
    this.webTicketData.page = undefined;
  }

  public saveWebTicketData() {
    if (this.webTicketData.section && this.webTicketData.page && this.webTicketData.description && this.webTicketData.personResponsible && this.webTicketData.category && this.webTicketData.status && this.webTicketData.priority) {
      this.data.callbackMessageResult(ModalOutcomeOptions.Update, this.webTicketData);
    }
  }

  public get interestedInPropertyNameControl() {
    return this.interestedInPropertyFormGroup.get('interestedInPropertyNameControl');
  }
  public get interestedInPropertyEmailControl() {
    return this.interestedInPropertyFormGroup.get('interestedInPropertyEmailControl');
  }
  public get interestedInPropertyPhoneNumberControl() {
    return this.interestedInPropertyFormGroup.get('interestedInPropertyPhoneNumberControl');
  }


  public get captureMemberNameControl() {
    return this.captureMemberFormGroup.get('captureMemberNameControl');
  }
  public get captureMemberSurnameControl() {
    return this.captureMemberFormGroup.get('captureMemberSurnameControl');
  }
  public get captureMemberPhoneNumberControl() {
    return this.captureMemberFormGroup.get('captureMemberPhoneNumberControl');
  }
  public get captureMemberEmailControl() {
    return this.captureMemberFormGroup.get('captureMemberEmailControl');
  }
  public get captureMemberHangarNumbersControl() {
    return this.captureMemberFormGroup.get('captureMemberHangarNumbersControl');
  }
  public get captureMemberStandNumbersControl() {
    return this.captureMemberFormGroup.get('captureMemberStandNumbersControl');
  }
  public get captureMemberIsAdminControl() {
    return this.captureMemberFormGroup.get('captureMemberIsAdminControl');
  }

}
