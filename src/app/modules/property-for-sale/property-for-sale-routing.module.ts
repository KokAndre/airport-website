import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangarRentingComponent } from './components/hangar-renting/hangar-renting.component';
import { HangarsForSaleComponent } from './components/hangars-for-sale/hangars-for-sale.component';

const routes: Routes = [
  {
    path: 'hangar-renting', component: HangarRentingComponent
  },
  {
    path: 'hangars-for-sale', component: HangarsForSaleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyForSaleRoutingModule { }
