import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';
import { MembersRoutingModule } from './members-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ReportAnIssueComponent } from './components/report-an-issue/report-an-issue.component';
import { GreenTedderfieldComponent } from './components/green-tedderfield/green-tedderfield.component';
import { GettingToKnowYouComponent } from './components/getting-to-know-you/getting-to-know-you.component';
import { SellMyHangerComponent } from './components/sell-my-hanger/sell-my-hanger.component';



@NgModule({
  declarations: [
    MembersLandingComponent,
    FaqsComponent,
    ReportAnIssueComponent,
    GreenTedderfieldComponent,
    GettingToKnowYouComponent,
    SellMyHangerComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ]
})
export class MembersModule { }
