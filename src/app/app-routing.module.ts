import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

const routes: Routes = [
  {
    path: '', component: SideNavComponent, children: [
      {
        path: '', redirectTo: 'welcome', pathMatch: 'full'
      },
      {
        path: 'welcome', component: LandingPageComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'about-us', loadChildren: () => import('./modules/about-us/about-us.module').then(m => m.AboutUsModule)
      },
      {
        path: 'contact-us', loadChildren: () => import('./modules/contact-us/contact-us.module').then(m => m.ContactUsModule)
      },
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
        path: 'gallery', loadChildren: () => import('./modules/gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path: 'members', loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule)
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
