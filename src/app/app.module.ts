import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IsRouterLinkActiveDirective } from './directives/is-router-link-active/is-router-link-active.directive';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OnEnterDirective } from './directives/on-enter/on-enter.directive';
import { AppModalComponent } from './components/app-modal/app-modal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    LoginComponent,
    HomePageComponent,
    RegisterComponent,
    IsRouterLinkActiveDirective,
    NavBarComponent,
    OnEnterDirective,
    AppModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    SharedModule
  ],
  exports: [
    MaterialModule,
    PdfViewerModule,
  ],
  providers: [
    {provide: 'googleTagManagerId', useValue: 'G-25PYHR38DD'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
