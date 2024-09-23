import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubHouseComponent } from './components/club-house/club-house.component';
import { FollowUsComponent } from './components/follow-us/follow-us.component';
import { TedderfieldHistoryComponent } from './components/tedderfield-history/tedderfield-history.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LiveWeatherComponent } from './components/live-weather/live-weather.component';



@NgModule({
  declarations: [
    ClubHouseComponent,
    FollowUsComponent,
    TedderfieldHistoryComponent,
    LiveWeatherComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModule
  ]
})
export class AboutUsModule { }
