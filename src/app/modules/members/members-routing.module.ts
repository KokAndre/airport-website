import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';
import { FaqsComponent } from './components/faqs/faqs.component';

const routes: Routes = [
  {
    path: 'welcome', component: MembersLandingComponent
  },
  {
    path: 'faqs', component: FaqsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
