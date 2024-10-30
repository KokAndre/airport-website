import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HangarsForSaleComponent } from './components/hangars-for-sale/hangars-for-sale.component';
import { StandsForSaleComponent } from './components/stands-for-sale/stands-for-sale.component';
import { PropertyForSaleRoutingModule } from './property-for-sale-routing.module';

@NgModule({
  declarations: [
    StandsForSaleComponent,
    HangarsForSaleComponent,
  ],
  imports: [
    CommonModule,
    PropertyForSaleRoutingModule,
    SharedModule
]
})
export class PropertyForSaleModule { }
