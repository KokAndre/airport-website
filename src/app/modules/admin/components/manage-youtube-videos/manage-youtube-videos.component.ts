import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-youtube-videos',
  templateUrl: './manage-youtube-videos.component.html',
  styleUrls: ['./manage-youtube-videos.component.scss']
})
export class ManageYoutubeVideosComponent implements OnInit {
  public youtubeData = new Array<string>();

  constructor() { }

  ngOnInit() {
    this.getYoutubeVideos();
  }

  public getYoutubeVideos() {
    //
  }

}
