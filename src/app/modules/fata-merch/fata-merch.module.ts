import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassifiedsComponent } from './components/classifieds/classifieds.component';
import { FataMerchRoutingModule } from './fata-merch-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ClassifiedsComponent
  ],
  imports: [
    CommonModule,
    FataMerchRoutingModule,
    SharedModule
  ]
})
export class FataMerchModule { }
