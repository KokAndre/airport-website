import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotInformationRoutingModule } from './pilot-information-routing.module';
import { MapAndLocationComponent } from './components/map-and-location/map-and-location.component';
import { AirfieldInformationComponent } from './components/airfield-information/airfield-information.component';
import { JoiningAndLandingComponent } from './components/joining-and-landing/joining-and-landing.component';
import { LiveWeatherUpdatesComponent } from './components/live-weather-updates/live-weather-updates.component';
import { OtherAirfieldsComponent } from './components/other-airfields/other-airfields.component';
import { ReportingHazardsComponent } from './components/reporting-hazards/reporting-hazards.component';
import { SurroundingAirfieldsComponent } from './components/surrounding-airfields/surrounding-airfields.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MapAndLocationComponent,
    AirfieldInformationComponent,
    JoiningAndLandingComponent,
    LiveWeatherUpdatesComponent,
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
