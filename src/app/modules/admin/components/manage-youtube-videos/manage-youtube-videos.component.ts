import { Component, OnInit } from '@angular/core';
import { AppRoutes, ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetYoutubeVideosDataResponse } from 'src/app/models/get-youtube-videos-data-response.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-youtube-videos',
  templateUrl: './manage-youtube-videos.component.html',
  styleUrls: ['./manage-youtube-videos.component.scss']
})
export class ManageYoutubeVideosComponent implements OnInit {
  public youtubeData: GetYoutubeVideosDataResponse.Video[];

  constructor(public appModalService: AppModalService, public adminService: AdminService, public router: Router) { }

  ngOnInit() {
    this.getYoutubeVideos();
  }

  public getYoutubeVideos() {
    this.adminService.getYoutubeVideos().subscribe((result: GetYoutubeVideosDataResponse.RootObject) => {
      this.youtubeData = result.youtubeVideos;
    }, error => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      this.router.navigateByUrl(AppRoutes.Home);
    });
  }

  public addYoutubeVideoClicked() {
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureYoutubeVideo, 'Add Video', '', null, this.addYoutubeVideoOutcome.bind(this));
  }

  public addYoutubeVideoOutcome(modalOutcome: string, videoData?: GetYoutubeVideosDataResponse.Video) {
    if (modalOutcome === ModalOutcomeOptions.Update) {

      if (!videoData.videoStartTime) {
        videoData.videoStartTime = 0;
      }

      if (!videoData.videoEndTime) {
        videoData.videoEndTime = 0;
      }

      const dataToSubmit = new GetYoutubeVideosDataResponse.Video();
      dataToSubmit.title = videoData.title;
      dataToSubmit.credits = videoData.credits;
      dataToSubmit.uploadType = videoData.uploadType;

      if (videoData.uploadType === 'youtube') {
        dataToSubmit.videoURL = videoData.videoURL;
        dataToSubmit.videoId = videoData.videoURL.split('?v=')[1];
        dataToSubmit.videoStartTime = videoData.videoStartTime;
        dataToSubmit.videoEndTime = videoData.videoEndTime;
      } else {
        dataToSubmit.videoURL = videoData.fileData.fileName;
        dataToSubmit.videoStartTime = 0;
        dataToSubmit.videoEndTime = 0;
        dataToSubmit.videoId = '';
      }

      this.adminService.addYoutubeVideo(dataToSubmit).subscribe((result: GetYoutubeVideosDataResponse.RootObject) => {
        this.appModalService.CloseModal();
        if (videoData.uploadType = 'upload') {
          this.uploadVideo(videoData.fileData.fileData);
        } else {
          this.getYoutubeVideos();
        }
      }, error => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      });
    }
  }

  public uploadVideo(fileData: any) {
    this.adminService.uploadVideo(fileData).subscribe((result) => {
      this.appModalService.CloseModal();
      this.getYoutubeVideos();
    }, error => {
      this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
    });
  }

  public editYoutubeVideoClicked(videoData: GetYoutubeVideosDataResponse.Video) {
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureYoutubeVideo, 'Edit Video', '', videoData, this.editYoutubeVideoOutcome.bind(this));
  }

  public editYoutubeVideoOutcome(modalOutcome: string, videoData: GetYoutubeVideosDataResponse.Video) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      this.adminService.editYoutubeVideo(videoData).subscribe(results => {
        this.appModalService.CloseModal();
        this.getYoutubeVideos();
      }, error => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      });
    }
  }

  public deleteYoutubeVideoClicked(videoData: GetYoutubeVideosDataResponse.Video) {
    this.appModalService.ShowConfirmationModal(ModalTypes.ConfirmationModal, 'Delete Video', `Are you sure you want to delte the following youtube video:<br />${videoData.title}`, null, this.deleteYoutubeVideoOutcome.bind(this, videoData));
  }


  public deleteYoutubeVideoOutcome(videoData: GetYoutubeVideosDataResponse.Video, modalOutcome: string) {
    if (modalOutcome === ModalOutcomeOptions.Confirm) {
      this.adminService.deleteYoutubeVideo(videoData.id).subscribe(results => {
        this.appModalService.CloseModal();
        this.getYoutubeVideos();
      }, error => {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, error.error.header, error.error.message, '');
      });
    }
  }

}
