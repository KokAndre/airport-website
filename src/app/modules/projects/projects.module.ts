import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AircraftProjectsComponent } from './components/aircraft-projects/aircraft-projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';



@NgModule({
  declarations: [
    AircraftProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
