import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AdminGuardService } from './route-guards/admin-guard.service';

const routes: Routes = [
  {
    path: '', component: SideNavComponent, children: [
      // {
      //   path: '', redirectTo: 'web-under-construction', pathMatch: 'full'
      // },
      // {
      //   path: 'web-under-construction', component: HomePageComponent
      // },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomePageComponent
      },
      {
        path: 'about-us', loadChildren: () => import('./modules/about-us/about-us.module').then(m => m.AboutUsModule)
      },
      // {
      //   path: 'contact-us', loadChildren: () => import('./modules/contact-us/contact-us.module').then(m => m.ContactUsModule)
      // },
      {
        path: 'pilot-information', loadChildren: () => import('./modules/pilot-information/pilot-information.module').then(m => m.PilotInformationModule)
      },
      {
        path: 'projects', loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'merch', loadChildren: () => import('./modules/fata-merch/fata-merch.module').then(m => m.FataMerchModule)
      },
      {
        path: 'training-and-renewals', loadChildren: () => import('./modules/training-and-renewals/training-and-renewals.module').then(m => m.TrainingAndRenewalsModule)
      },
      {
        path: 'members', loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule)
      },
      {
        path: 'property-for-sale', loadChildren: () => import('./modules/property-for-sale/property-for-sale.module').then(m => m.PropertyForSaleModule)
      },
      {
        // TODO: Add route guard so only logged in admin can see this page!!
        path: 'admin', canActivate: [AdminGuardService], loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
