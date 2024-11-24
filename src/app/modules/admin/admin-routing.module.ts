import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUsRequestsComponent } from './components/follow-us-requests/follow-us-requests.component';
import { GalleryAdminPageComponent } from './components/gallery-admin-page/gallery-admin-page.component';
import { GreeningTedderfieldRequestsComponent } from './components/greening-tedderfield-requests/greening-tedderfield-requests.component';
import { ReportIssueRequestsComponent } from './components/report-issue-requests/report-issue-requests.component';
import { ManageHomeScreenBannerComponent } from './components/manage-home-screen-banner/manage-home-screen-banner.component';
import { ManageHangersForSaleComponent } from './components/manage-hangers-for-sale/manage-hangers-for-sale.component';
import { ManageStandsForSaleComponent } from './components/manage-stands-for-sale/manage-stands-for-sale.component';
import { ManageHangersForSaleInterestComponent } from './components/manage-hangers-for-sale-interest/manage-hangers-for-sale-interest.component';
import { ManageStandsForSaleInterestComponent } from './components/manage-stands-for-sale-interest/manage-stands-for-sale-interest.component';
import { ManageLeviesComponent } from './components/manage-levies/manage-levies.component';
import { ManageMembersDocumentsComponent } from './components/manage-members-documents/manage-members-documents.component';

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
  },
  {
    path: 'manage-interest-in-hanger-for-sale', component: ManageHangersForSaleInterestComponent
  },
  {
    path: 'manage-interest-in-stand-for-sale', component: ManageStandsForSaleInterestComponent
  },
  {
    path: 'manage-levies', component: ManageLeviesComponent
  },
  {
    path: 'manage-members-documents', component: ManageMembersDocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
