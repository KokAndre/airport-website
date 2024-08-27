import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { ClubHouseComponent } from './components/club-house/club-house.component';
import { FollowUsComponent } from './components/follow-us/follow-us.component';
import { TedderfieldHistoryComponent } from './components/tedderfield-history/tedderfield-history.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { RegisterComponent } from './components/register/register.component';
import { MapAndLocationComponent } from './components/map-and-location/map-and-location.component';
import { AirfieldInformationComponent } from './components/airfield-information/airfield-information.component';
import { JoiningAndLandingComponent } from './components/joining-and-landing/joining-and-landing.component';
import { LiveWeatherUpdatesComponent } from './components/live-weather-updates/live-weather-updates.component';
import { OtherAirfieldsComponent } from './components/other-airfields/other-airfields.component';
import { ReportingHazardsComponent } from './components/reporting-hazards/reporting-hazards.component';
import { SurroundingAirfieldsComponent } from './components/surrounding-airfields/surrounding-airfields.component';

const routes: Routes = [
    {
      path: '', component: SideNavComponent, children: [
        {
          path: '', redirectTo: 'home', pathMatch: 'full'
        },
        {
          path: 'home', component: HomePageComponent
        },
        {
          path: 'login', component: LoginComponent
        },
        {
          path: 'register', component: RegisterComponent
        },
        {
          path: 'club-house', component: ClubHouseComponent
        },
        {
          path: 'follow-us', component: FollowUsComponent
        },
        {
          path: 'tedderfield-history', component: TedderfieldHistoryComponent
        },
        {
          path: 'contact-us', component: ContactUsComponent
        },
        {
          path: 'map-and-location', component: MapAndLocationComponent
        },
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
        }
      ]
    }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
