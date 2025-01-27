import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassifiedsComponent } from './components/classifieds/classifieds.component';
import { FataMerchRoutingModule } from './fata-merch-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TedderfieldMerchHubComponent } from './components/tedderfield-merch-hub/tedderfield-merch-hub.component';



@NgModule({
  declarations: [
    ClassifiedsComponent,
    TedderfieldMerchHubComponent
  ],
  imports: [
    CommonModule,
    FataMerchRoutingModule,
    SharedModule
  ]
})
export class FataMerchModule { }
