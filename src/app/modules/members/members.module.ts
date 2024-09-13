import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';
import { MembersRoutingModule } from './members-routing.module';



@NgModule({
  declarations: [
    MembersLandingComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule
  ]
})
export class MembersModule { }
