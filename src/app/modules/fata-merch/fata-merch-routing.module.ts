import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedsComponent } from './components/classifieds/classifieds.component';

const routes: Routes = [
  {
    path: 'classifieds', component: ClassifiedsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FataMerchRoutingModule { }
