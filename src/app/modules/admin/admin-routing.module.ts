import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryAdminPageComponent } from './components/gallery-admin-page/gallery-admin-page.component';
import { FollowUsRequestsComponent } from './components/follow-us-requests/follow-us-requests.component';

const routes: Routes = [
  {
    path: 'edit-gallery', component: GalleryAdminPageComponent
  },
  {
    path: 'follow-us-requests', component: FollowUsRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
