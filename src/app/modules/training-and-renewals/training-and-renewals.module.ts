import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaqsComponent } from './components/faqs/faqs.component';
import { InfoComponent } from './components/info/info.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { NeedHelpComponent } from './components/need-help/need-help.component';
import { TrainingAndRenewalsRoutingModule } from './training-and-renewals-routing.module';



@NgModule({
  declarations: [
    FaqsComponent,
    InfoComponent,
    InstructorsComponent,
    NeedHelpComponent
  ],
  imports: [
    CommonModule,
    TrainingAndRenewalsRoutingModule
  ]
})
export class TrainingAndRenewalsModule { }
