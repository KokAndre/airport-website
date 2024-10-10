import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-members-landing',
  templateUrl: './members-landing.component.html',
  styleUrls: ['./members-landing.component.scss']
})
export class MembersLandingComponent implements OnInit {
  public loginFormGroup: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeControls();
  }

  public initializeControls() {
    this.loginFormGroup = this.formBuilder.group({
      loginEmailControl: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,24})$')]),
      loginPasswordControl: new FormControl('', [Validators.required]),
    });
  }

  public loginClicked() {
    //
  }


  public get loginEmailControl() {
    return this.loginFormGroup.get('loginEmailControl');
  }

}
