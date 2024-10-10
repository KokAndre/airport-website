import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';
import { MembersRoutingModule } from './members-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MembersLandingComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ]
})
export class MembersModule { }
