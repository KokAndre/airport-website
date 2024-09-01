import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AircraftProjectsComponent } from './components/aircraft-projects/aircraft-projects.component';

const routes: Routes = [
  {
    path: '', component: AircraftProjectsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
