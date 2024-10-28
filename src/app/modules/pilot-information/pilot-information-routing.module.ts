import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MapAndLocationComponent } from './components/map-and-location/map-and-location.component';
import { AirfieldInformationComponent } from './components/airfield-information/airfield-information.component';
import { JoiningAndLandingComponent } from './components/joining-and-landing/joining-and-landing.component';
import { LiveWeatherUpdatesComponent } from './components/live-weather-updates/live-weather-updates.component';
import { OtherAirfieldsComponent } from './components/other-airfields/other-airfields.component';
import { ReportingHazardsComponent } from './components/reporting-hazards/reporting-hazards.component';
import { SurroundingAirfieldsComponent } from './components/surrounding-airfields/surrounding-airfields.component';

const routes: Routes = [
  // {
  //   path: 'map-and-location', component: MapAndLocationComponent
  // },
  {
    path: 'airfield-information', component: AirfieldInformationComponent
  },
  {
    path: 'joining-and-landing', component: JoiningAndLandingComponent
  },
  {
    path: 'live-weather-updates', component: LiveWeatherUpdatesComponent
  },
  {
    path: 'other-airfields', component: OtherAirfieldsComponent
  },
  {
    path: 'reporting-hazards', component: ReportingHazardsComponent
  },
  {
    path: 'surrounding-airfields', component: SurroundingAirfieldsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PilotInformationRoutingModule { }
