import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ReportAnIssueComponent } from './components/report-an-issue/report-an-issue.component';
import { GreenTedderfieldComponent } from './components/green-tedderfield/green-tedderfield.component';
import { GettingToKnowYouComponent } from './components/getting-to-know-you/getting-to-know-you.component';
import { SellMyHangerComponent } from './components/sell-my-hanger/sell-my-hanger.component';

const routes: Routes = [
  {
    path: 'welcome', component: MembersLandingComponent
  },
  {
    path: 'faqs', component: FaqsComponent
  },
  {
    path: 'report-an-issue', component: ReportAnIssueComponent
  },
  {
    path: 'greening-tedderfield', component: GreenTedderfieldComponent
  },
  {
    path: 'getting-to-know-you', component: GettingToKnowYouComponent
  },
  {
    path: 'sell-my-hanger', component: SellMyHangerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
