import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUsRequestsComponent } from './components/follow-us-requests/follow-us-requests.component';
import { GalleryAdminPageComponent } from './components/gallery-admin-page/gallery-admin-page.component';
import { GreeningTedderfieldRequestsComponent } from './components/greening-tedderfield-requests/greening-tedderfield-requests.component';
import { ReportIssueRequestsComponent } from './components/report-issue-requests/report-issue-requests.component';
import { ManageHomeScreenBannerComponent } from './components/manage-home-screen-banner/manage-home-screen-banner.component';
import { ManageHangersForSaleComponent } from './components/manage-hangers-for-sale/manage-hangers-for-sale.component';
import { ManageStandsForSaleComponent } from './components/manage-stands-for-sale/manage-stands-for-sale.component';

const routes: Routes = [
  {
    path: 'edit-gallery', component: GalleryAdminPageComponent
  },
  {
    path: 'follow-us-requests', component: FollowUsRequestsComponent
  },
  {
    path: 'report-issue-requests', component: ReportIssueRequestsComponent
  },
  {
    path: 'greening-tedderfield-requests', component: GreeningTedderfieldRequestsComponent
  },
  {
    path: 'manage-home-screen-banner', component: ManageHomeScreenBannerComponent
  },
  {
    path: 'manage-hangers-for-sale', component: ManageHangersForSaleComponent
  },
  {
    path: 'manage-stands-for-sale', component: ManageStandsForSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
