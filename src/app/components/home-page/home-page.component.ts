import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  public backgroundVideo: any;

  constructor() {}

  ngOnInit() {
    //
  }

  ngAfterViewInit() {
    this.backgroundVideo = document.getElementById("backgroundVideo");
    // this.backgroundVideo.play();

    // const media = this.videoplayer.nativeElement;
    this.backgroundVideo.muted = true; // without this line it's not working although I have "muted" in HTML
    this.backgroundVideo.play();
  }

}
