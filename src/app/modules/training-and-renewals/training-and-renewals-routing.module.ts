import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqsComponent } from './components/faqs/faqs.component';
import { InfoComponent } from './components/info/info.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { NeedHelpComponent } from './components/need-help/need-help.component';

const routes: Routes = [
  {
    path: 'faqs', component: FaqsComponent
  },
  {
    path: 'info', component: InfoComponent
  },
  {
    path: 'instructors', component: InstructorsComponent
  },
  {
    path: 'need-help', component: NeedHelpComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingAndRenewalsRoutingModule { }
