import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tedderfield-merch-hub',
  templateUrl: './tedderfield-merch-hub.component.html',
  styleUrls: ['./tedderfield-merch-hub.component.scss']
})
export class TedderfieldMerchHubComponent implements OnInit {
  public isWelcomeExpanded = true;
  public isWhatsInOurCargoHodldExpanded = true;
  public isHowToOrderExpanded = true;
  public isPeakCupChallengeExpanded = true;
  public isWhatsInItForYouExpanded = true;
  public isReadyToJoinTheFunExpanded = true;

  constructor() { }

  ngOnInit() {
  }

}
