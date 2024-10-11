import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-members-landing',
  templateUrl: './members-landing.component.html',
  styleUrls: ['./members-landing.component.scss']
})
export class MembersLandingComponent implements OnInit {
  public loginFormGroup: FormGroup;

  constructor(public formBuilder: FormBuilder, public loginService: LoginService) { }

  ngOnInit() {
    this.initializeControls();
  }

  public initializeControls() {
    this.loginFormGroup = this.formBuilder.group({
      loginEmailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
    });
  }

  public loginClicked() {
    this.loginService.checkWhitelisting(this.loginEmailControl?.value).then(result => {
      console.log('RESULTS: ', result);
    });
  }


  public get loginEmailControl() {
    return this.loginFormGroup.get('loginEmailControl');
  }

}
