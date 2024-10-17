import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AirfieldComponent } from './components/airfield/airfield.component';
import { DaneComponent } from './components/dane/dane.component';
import { FlyAwaysComponent } from './components/fly-aways/fly-aways.component';
import { StoriesComponent } from './components/stories/stories.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryLandingComponent } from './components/gallery-landing/gallery-landing.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AirfieldComponent,
    DaneComponent,
    FlyAwaysComponent,
    StoriesComponent,
    GalleryLandingComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule
]
})
export class GalleryModule { }


