import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DocumentsComponent } from './components/documents/documents.component';
import { DonationsComponent } from './components/donations/donations.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { GettingToKnowYouComponent } from './components/getting-to-know-you/getting-to-know-you.component';
import { GreenTedderfieldComponent } from './components/green-tedderfield/green-tedderfield.component';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';
import { ReportAnIssueComponent } from './components/report-an-issue/report-an-issue.component';
import { SubmitClassifiedsComponent } from './components/submit-classifieds/submit-classifieds.component';
import { WhosWhoInTheZooComponent } from './components/whos-who-in-the-zoo/whos-who-in-the-zoo.component';
import { YourTrusteesComponent } from './components/your-trustees/your-trustees.component';
import { MembersRoutingModule } from './members-routing.module';

@NgModule({
  declarations: [
    MembersLandingComponent,
    FaqsComponent,
    ReportAnIssueComponent,
    GreenTedderfieldComponent,
    GettingToKnowYouComponent,
    YourTrusteesComponent,
    DocumentsComponent,
    SubmitClassifiedsComponent,
    WhosWhoInTheZooComponent,
    ManageProfileComponent,
    DonationsComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ]
})
export class MembersModule { }
