import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirfieldInformationComponent } from './components/airfield-information/airfield-information.component';
import { JoiningAndLandingComponent } from './components/joining-and-landing/joining-and-landing.component';
import { OtherAirfieldsComponent } from './components/other-airfields/other-airfields.component';
import { ReportingHazardsComponent } from './components/reporting-hazards/reporting-hazards.component';
import { SurroundingAirfieldsComponent } from './components/surrounding-airfields/surrounding-airfields.component';

const routes: Routes = [
  {
    path: 'airfield-information', component: AirfieldInformationComponent
  },
  {
    path: 'joining-and-landing', component: JoiningAndLandingComponent
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
