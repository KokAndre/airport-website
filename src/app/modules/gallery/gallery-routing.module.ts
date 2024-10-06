import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirfieldComponent } from './components/airfield/airfield.component';
import { DaneComponent } from './components/dane/dane.component';
import { FlyAwaysComponent } from './components/fly-aways/fly-aways.component';
import { StoriesComponent } from './components/stories/stories.component';
import { GalleryLandingComponent } from './components/gallery-landing/gallery-landing.component';
import { GalleryAdminPageComponent } from './components/gallery-admin-page/gallery-admin-page.component';

const routes: Routes = [
  {
    path: '', component: GalleryLandingComponent
  },
  {
    // TODO: Add route guard so only logged in admin can see this page!!
    path: 'admin', component: GalleryAdminPageComponent
  }
  // {
  //   path: 'airfield', component: AirfieldComponent
  // },
  // {
  //   path: 'dane', component: DaneComponent
  // },
  // {
  //   path: 'fly-aways', component: FlyAwaysComponent
  // },
  // {
  //   path: 'stories', component: StoriesComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
