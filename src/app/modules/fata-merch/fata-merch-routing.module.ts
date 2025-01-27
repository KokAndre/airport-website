import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedsComponent } from './components/classifieds/classifieds.component';
import { TedderfieldMerchHubComponent } from './components/tedderfield-merch-hub/tedderfield-merch-hub.component';

const routes: Routes = [
  {
    path: 'classifieds', component: ClassifiedsComponent
  },
  {
    path: 'tedderfield-merch-hub', component: TedderfieldMerchHubComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FataMerchRoutingModule { }
