import { Component, OnInit } from '@angular/core';
import { ModalOutcomeOptions, ModalTypes } from 'src/app/enums/app.enums';
import { GetYoutubeVideosDataResponse } from 'src/app/models/get-youtube-videos-data-response.model';
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';

@Component({
  selector: 'app-manage-youtube-videos',
  templateUrl: './manage-youtube-videos.component.html',
  styleUrls: ['./manage-youtube-videos.component.scss']
})
export class ManageYoutubeVideosComponent implements OnInit {
  public youtubeData = new Array<string>();

  constructor(public appModalService: AppModalService) { }

  ngOnInit() {
    this.getYoutubeVideos();
  }

  public getYoutubeVideos() {
    //
  }

  public addYoutubeVideoClicked() {
    this.appModalService.ShowConfirmationModal(ModalTypes.CaptureYoutubeVideo, 'Add Video', '', null, this.addYoutubeVideoOutcome.bind(this));
  }

  public addYoutubeVideoOutcome(modalOutcome: string, videoData?: GetYoutubeVideosDataResponse.Video) {
    if (modalOutcome === ModalOutcomeOptions.Update) {
      console.log('VIDEO DATA:', videoData);
    }
  }

}
