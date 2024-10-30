import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ReportAnIssueComponent } from './components/report-an-issue/report-an-issue.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
