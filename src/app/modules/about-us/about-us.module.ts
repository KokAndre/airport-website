import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubHouseComponent } from './components/club-house/club-house.component';
import { FollowUsComponent } from './components/follow-us/follow-us.component';
import { TedderfieldHistoryComponent } from './components/tedderfield-history/tedderfield-history.component';
import { AboutUsRoutingModule } from './about-us-routing.module';



@NgModule({
  declarations: [
    ClubHouseComponent,
    FollowUsComponent,
    TedderfieldHistoryComponent,
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
