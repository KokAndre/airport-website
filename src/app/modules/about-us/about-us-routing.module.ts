import { Routes, RouterModule } from '@angular/router';
import { ClubHouseComponent } from './components/club-house/club-house.component';
import { FollowUsComponent } from './components/follow-us/follow-us.component';
import { TedderfieldHistoryComponent } from './components/tedderfield-history/tedderfield-history.component';
import { NgModule } from '@angular/core';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
