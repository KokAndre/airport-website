import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotInformationRoutingModule } from './pilot-information-routing.module';
import { AirfieldInformationComponent } from './components/airfield-information/airfield-information.component';
import { JoiningAndLandingComponent } from './components/joining-and-landing/joining-and-landing.component';
import { OtherAirfieldsComponent } from './components/other-airfields/other-airfields.component';
import { ReportingHazardsComponent } from './components/reporting-hazards/reporting-hazards.component';
import { SurroundingAirfieldsComponent } from './components/surrounding-airfields/surrounding-airfields.component';
import { SharedModule } from '../shared/shared.module';
import { CircuitProceduresComponent } from './components/circuit-procedures/circuit-procedures.component';



@NgModule({
  declarations: [
    AirfieldInformationComponent,
    JoiningAndLandingComponent,
    OtherAirfieldsComponent,
    ReportingHazardsComponent,
    SurroundingAirfieldsComponent,
    CircuitProceduresComponent
  ],
  imports: [
    CommonModule,
    PilotInformationRoutingModule,
    SharedModule
  ]
})
export class PilotInformationModule { }
