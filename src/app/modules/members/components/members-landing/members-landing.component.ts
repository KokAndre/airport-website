import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageKeys, ModalTypes } from 'src/app/enums/app.enums';
import { AppHelperFunction, LocalStorageHelper } from 'src/app/helpers/app-helper.functions';
import { GetUserDataResponse } from 'src/app/models/get-user-data-response.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-members-landing',
  templateUrl: './members-landing.component.html',
  styleUrls: ['./members-landing.component.scss']
})
export class MembersLandingComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public userData: GetUserDataResponse.Data;
  public displayLoginScreen = false;
  public isWelcomeExpanded = true;
  public isWhySignInExpanded = true;
  public isHowToAccessYourAccountExpanded = true;

  constructor(public formBuilder: FormBuilder, public loginService: LoginService, public appModalService: AppModalService) { }

  ngOnInit() {
    this.initializeControls();
    this.checkForPrefferedEmail();
  }

  public initializeControls() {
    this.loginFormGroup = this.formBuilder.group({
      loginEmailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
    });
  }

  public loginClicked() {
    this.loginService.checkWhitelisting(this.loginEmailControl?.value).subscribe((result: GetUserDataResponse.RootObject) => {
      if (result.status === 200) {
        this.addPrefferedEmailToLocalStorage();
        this.userData = result.data;

        this.userData.hangarNumbers = AppHelperFunction.splitStringToArray(`${result.data.hangarNumbers}`);
        this.userData.standNumbers = AppHelperFunction.splitStringToArray(`${result.data.standNumbers}`);
        this.displayLoginScreen = true;
      }
    });
  }

  public displayLoginPageNoDataError() {
    this.displayLoginScreen = false;
    this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'No Member Data Provided', 'No member data was provided. Please contact <a class="red-text no-underline" href="mailto:info@tedderfield.co.za">info@tedderfield.co.za</a>', null);
  }

  public displayWelcomePage() {
    this.displayLoginScreen = false;
  }

  public get loginEmailControl() {
    return this.loginFormGroup.get('loginEmailControl');
  }

  public addPrefferedEmailToLocalStorage() {
    const storedValue = LocalStorageHelper.getItem(LocalStorageKeys.PrefferedWelcomeEmail);
    if (!storedValue || storedValue?.toLowerCase() !== this.loginEmailControl?.value?.toLowerCase()) {
      LocalStorageHelper.storeItem(LocalStorageKeys.PrefferedWelcomeEmail, this.loginEmailControl?.value?.toLowerCase());
    }
  }

  public checkForPrefferedEmail() {
    const storedEmail = LocalStorageHelper.getItem(LocalStorageKeys.PrefferedWelcomeEmail);
    if (storedEmail) {
      this.loginEmailControl?.setValue(storedEmail);
    }
  }

}
