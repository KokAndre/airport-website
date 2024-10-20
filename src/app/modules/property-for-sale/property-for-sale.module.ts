import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyForSaleRoutingModule } from './property-for-sale-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HangarRentingComponent } from './components/hangar-renting/hangar-renting.component';
import { HangarsForSaleComponent } from './components/hangars-for-sale/hangars-for-sale.component';

@NgModule({
  declarations: [
    HangarRentingComponent,
    HangarsForSaleComponent,
  ],
  imports: [
    CommonModule,
    PropertyForSaleRoutingModule,
    SharedModule
]
})
export class PropertyForSaleModule { }
