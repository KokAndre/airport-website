import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';
import { MembersRoutingModule } from './members-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FaqsComponent } from './components/faqs/faqs.component';



@NgModule({
  declarations: [
    MembersLandingComponent,
    FaqsComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ]
})
export class MembersModule { }
