import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { GalleryAdminPageComponent } from './components/gallery-admin-page/gallery-admin-page.component';
import { FollowUsRequestsComponent } from './components/follow-us-requests/follow-us-requests.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    GalleryAdminPageComponent,
    FollowUsRequestsComponent
  ]
})
export class AdminModule { }
