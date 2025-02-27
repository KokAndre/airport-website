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
import { ManageLeviesComponent } from './components/manage-levies/manage-levies.component';
import { ManageMembersDocumentsComponent } from './components/manage-members-documents/manage-members-documents.component';
import { ManageClassifiedsForSaleComponent } from './components/manage-classifieds-for-sale/manage-classifieds-for-sale.component';
import { ManageClassifiedsForSaleInterestComponent } from './components/manage-classifieds-for-sale-interest/manage-classifieds-for-sale-interest.component';
import { ManageMembersComponent } from './components/manage-members/manage-members.component';
import { ManageReportIssueConfigComponent } from './components/manage-report-issue-config/manage-report-issue-config.component';
import { ManageGettingToKnowYouComponent } from './components/manage-getting-to-know-you/manage-getting-to-know-you.component';
import { ManageYoutubeVideosComponent } from './components/manage-youtube-videos/manage-youtube-videos.component';
import { WebsiteTicketsComponent } from './components/website-tickets/website-tickets.component';
import { MembersConsentsComponent } from './components/members-consents/members-consents.component';
import { ManageBackendEmailConfigComponent } from './components/manage-backend-email-config/manage-backend-email-config.component';

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
    ManageStandsForSaleInterestComponent,
    ManageLeviesComponent,
    ManageMembersDocumentsComponent,
    ManageClassifiedsForSaleComponent,
    ManageClassifiedsForSaleInterestComponent,
    ManageMembersComponent,
    ManageReportIssueConfigComponent,
    ManageGettingToKnowYouComponent,
    ManageYoutubeVideosComponent,
    WebsiteTicketsComponent,
    MembersConsentsComponent,
    ManageBackendEmailConfigComponent
  ]
})
export class AdminModule { }
