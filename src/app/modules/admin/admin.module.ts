import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { GalleryAdminPageComponent } from './components/gallery-admin-page/gallery-admin-page.component';
import { FollowUsRequestsComponent } from './components/follow-us-requests/follow-us-requests.component';
import { ReportIssueRequestsComponent } from './components/report-issue-requests/report-issue-requests.component';
import { GreeningTedderfieldRequestsComponent } from './components/greening-tedderfield-requests/greening-tedderfield-requests.component';
import { ManageHomeScreenBannerComponent } from './components/manage-home-screen-banner/manage-home-screen-banner.component';
import { ManageHangersForSaleComponent } from './components/manage-hangers-for-sale/manage-hangers-for-sale.component';
import { ManageStandsForSaleComponent } from './components/manage-stands-for-sale/manage-stands-for-sale.component';
import { ManageHangersForSaleInterestComponent } from './components/manage-hangers-for-sale-interest/manage-hangers-for-sale-interest.component';
import { ManageStandsForSaleInterestComponent } from './components/manage-stands-for-sale-interest/manage-stands-for-sale-interest.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    GalleryAdminPageComponent,
    FollowUsRequestsComponent,
    ReportIssueRequestsComponent,
    GreeningTedderfieldRequestsComponent,
    ManageHomeScreenBannerComponent,
    ManageHangersForSaleComponent,
    ManageStandsForSaleComponent,
    ManageHangersForSaleInterestComponent,
    ManageStandsForSaleInterestComponent
  ]
})
export class AdminModule { }
