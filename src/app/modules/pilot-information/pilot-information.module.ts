import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AirfieldInformationComponent } from './components/airfield-information/airfield-information.component';
import { JoiningAndLandingComponent } from './components/joining-and-landing/joining-and-landing.component';
import { OtherAirfieldsComponent } from './components/other-airfields/other-airfields.component';
import { ReportingHazardsComponent } from './components/reporting-hazards/reporting-hazards.component';
import { SurroundingAirfieldsComponent } from './components/surrounding-airfields/surrounding-airfields.component';
import { PilotInformationRoutingModule } from './pilot-information-routing.module';



@NgModule({
  declarations: [
    AirfieldInformationComponent,
    JoiningAndLandingComponent,
    OtherAirfieldsComponent,
    ReportingHazardsComponent,
    SurroundingAirfieldsComponent
  ],
  imports: [
    CommonModule,
    PilotInformationRoutingModule,
    SharedModule
  ]
})
export class PilotInformationModule { }
