import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassifiedsComponent } from './components/classifieds/classifieds.component';
import { HangarRentingComponent } from './components/hangar-renting/hangar-renting.component';
import { HangarsForSaleComponent } from './components/hangars-for-sale/hangars-for-sale.component';
import { FataMerchRoutingModule } from './fata-merch-routing.module';



@NgModule({
  declarations: [
    ClassifiedsComponent,
    HangarRentingComponent,
    HangarsForSaleComponent,
  ],
  imports: [
    CommonModule,
    FataMerchRoutingModule
  ]
})
export class FataMerchModule { }
