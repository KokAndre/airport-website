import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryAdminPageComponent } from './components/gallery-admin-page/gallery-admin-page.component';

const routes: Routes = [
  {
    path: 'edit-gallery', component: GalleryAdminPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
