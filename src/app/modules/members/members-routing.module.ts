import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MembersLandingComponent } from './components/members-landing/members-landing.component';

const routes: Routes = [
  {
    path: '', component: MembersLandingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
