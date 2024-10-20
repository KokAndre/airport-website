import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassifiedsComponent } from './components/classifieds/classifieds.component';
import { FataMerchRoutingModule } from './fata-merch-routing.module';



@NgModule({
  declarations: [
    ClassifiedsComponent
  ],
  imports: [
    CommonModule,
    FataMerchRoutingModule
  ]
})
export class FataMerchModule { }
