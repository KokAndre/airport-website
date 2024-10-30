import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangarsForSaleComponent } from './components/hangars-for-sale/hangars-for-sale.component';
import { StandsForSaleComponent } from './components/stands-for-sale/stands-for-sale.component';

const routes: Routes = [
  {
    path: 'stands-for-sale', component: StandsForSaleComponent
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
