import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes, ModalTypes } from 'src/app/enums/app.enums';
import { GetYoutubeVideosDataResponse } from 'src/app/models/get-youtube-videos-data-response.model';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.component.html',
  styleUrls: ['./youtube-videos.component.scss']
})
export class YoutubeVideosComponent implements OnInit {
  public isVideosExpanded = true;
  public youtubeData: GetYoutubeVideosDataResponse.Video[];
  apiLoaded = false;

  constructor(public appModalService: AppModalService, public adminService: AdminService, public router: Router) { }

  ngOnInit() {
    this.getYoutubeVideos();

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  public getYoutubeVideos() {
    this.adminService.getYoutubeVideos().subscribe((result: GetYoutubeVideosDataResponse.RootObject) => {
      this.youtubeData = result.youtubeVideos;
    }, error => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      this.router.navigateByUrl(AppRoutes.Home);
    });
  }

}
