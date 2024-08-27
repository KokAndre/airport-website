import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
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

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    LoginComponent,
    HomePageComponent,
    ClubHouseComponent,
    FollowUsComponent,
    TedderfieldHistoryComponent,
    ContactUsComponent,
    RegisterComponent,
    MapAndLocationComponent,
    AirfieldInformationComponent,
    JoiningAndLandingComponent,
    LiveWeatherUpdatesComponent,
    OtherAirfieldsComponent,
    ReportingHazardsComponent,
    SurroundingAirfieldsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
