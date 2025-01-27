import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ReportAnIssueComponent } from './components/report-an-issue/report-an-issue.component';
import { GreenTedderfieldComponent } from './components/green-tedderfield/green-tedderfield.component';
import { GettingToKnowYouComponent } from './components/getting-to-know-you/getting-to-know-you.component';
import { SellMyHangerComponent } from './components/sell-my-hanger/sell-my-hanger.component';
import { SellMyStandComponent } from './components/sell-my-stand/sell-my-stand.component';
import { YourTrusteesComponent } from './components/your-trustees/your-trustees.component';
import { LoginGuardService } from 'src/app/route-guards/login-guard.service';
import { DocumentsComponent } from './components/documents/documents.component';
import { SubmitClassifiedsComponent } from './components/submit-classifieds/submit-classifieds.component';
import { HasCompletedGettingToKnowYouGuardService } from 'src/app/route-guards/has-completed-getting-to-know-you-guard.service';
import { WhosWhoInTheZooComponent } from './components/whos-who-in-the-zoo/whos-who-in-the-zoo.component';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';
import { DonationsComponent } from './components/donations/donations.component';

const routes: Routes = [
  {
    path: 'welcome', component: MembersLandingComponent
  },
  {
    path: 'faqs', component: FaqsComponent
  },
  {
    path: 'report-an-issue', canActivate: [LoginGuardService], component: ReportAnIssueComponent
  },
  {
    path: 'greening-tedderfield', canActivate: [LoginGuardService], component: GreenTedderfieldComponent
  },
  {
    path: 'getting-to-know-you', canActivate: [LoginGuardService], component: GettingToKnowYouComponent
  },
  {
    path: 'sell-my-hanger', canActivate: [LoginGuardService], component: SellMyHangerComponent
  },
  {
    path: 'sell-my-stand', canActivate: [LoginGuardService], component: SellMyStandComponent
  },
  {
    path: 'your-trustees', canActivate: [LoginGuardService], component: YourTrusteesComponent
  },
  {
    path: 'classifieds', canActivate: [LoginGuardService], component: SubmitClassifiedsComponent
  },
  {
    path: 'documents', canActivate: [LoginGuardService], component: DocumentsComponent
  },
  {
    path: 'whos-who-in-the-tedderfield-zoo', canActivate: [LoginGuardService, HasCompletedGettingToKnowYouGuardService], component: WhosWhoInTheZooComponent
  },
  {
    path: 'manage-profile', canActivate: [LoginGuardService], component: ManageProfileComponent
  },
  {
    path: 'donations', canActivate: [LoginGuardService], component: DonationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
