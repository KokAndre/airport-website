import { Routes, RouterModule } from '@angular/router';
import { ClubHouseComponent } from './components/club-house/club-house.component';
import { FollowUsComponent } from './components/follow-us/follow-us.component';
import { TedderfieldHistoryComponent } from './components/tedderfield-history/tedderfield-history.component';
import { NgModule } from '@angular/core';
import { LiveWeatherComponent } from './components/live-weather/live-weather.component';
import { MissionStatementComponent } from './components/mission-statement/mission-statement.component';
import { VisionStatementComponent } from './components/vision-statement/vision-statement.component';

const routes: Routes = [
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
    path: 'live-weather', component: LiveWeatherComponent
  },
  {
    path: 'mission-statement', component: MissionStatementComponent
  },
  {
    path: 'vision-statement', component: VisionStatementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
