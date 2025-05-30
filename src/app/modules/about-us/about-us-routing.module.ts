import { Routes, RouterModule } from '@angular/router';
import { ClubHouseComponent } from './components/club-house/club-house.component';
import { FollowUsComponent } from './components/follow-us/follow-us.component';
import { TedderfieldHistoryComponent } from './components/tedderfield-history/tedderfield-history.component';
import { NgModule } from '@angular/core';
import { LiveWeatherComponent } from './components/live-weather/live-weather.component';
import { MissionAndVisionStatementComponent } from './components/mission-and-vision-statement/mission-and-vision-statement.component';
import { GalleryLandingComponent } from './components/gallery-landing/gallery-landing.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { YoutubeVideosComponent } from './components/youtube-videos/youtube-videos.component';

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
    path: 'mission-and-vision-statement', component: MissionAndVisionStatementComponent
  },
  {
    path: 'gallery', component: GalleryLandingComponent
  },
  {
    path: 'videos', component: YoutubeVideosComponent
  },
  {
    path: 'contact-us', component: ContactUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
