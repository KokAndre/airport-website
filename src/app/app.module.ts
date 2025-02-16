import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModalComponent } from './components/app-modal/app-modal.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { IsRouterLinkActiveDirective } from './directives/is-router-link-active/is-router-link-active.directive';
import { MaterialModule } from './material.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthInterceptor } from './http-interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomePageComponent,
    IsRouterLinkActiveDirective,
    NavBarComponent,
    AppModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    // PdfViewerModule,
    SharedModule
  ],
  exports: [
    MaterialModule,
    PdfViewerModule,
  ],
  providers: [
    {provide: 'googleTagManagerId', useValue: 'G-25PYHR38DD'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
