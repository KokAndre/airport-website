import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirfieldComponent } from './components/airfield/airfield.component';
import { DaneComponent } from './components/dane/dane.component';
import { FlyAwaysComponent } from './components/fly-aways/fly-aways.component';
import { StoriesComponent } from './components/stories/stories.component';

const routes: Routes = [
  {
    path: 'airfield', component: AirfieldComponent
  },
  {
    path: 'dane', component: DaneComponent
  },
  {
    path: 'fly-aways', component: FlyAwaysComponent
  },
  {
    path: 'stories', component: StoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
