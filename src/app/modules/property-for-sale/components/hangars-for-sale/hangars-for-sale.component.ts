import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangars-for-sale',
  templateUrl: './hangars-for-sale.component.html',
  styleUrls: ['./hangars-for-sale.component.scss']
})
export class HangarsForSaleComponent implements OnInit {
  public isAviationMeetsCommunityExpanded = false;
  public isWhyInvestInAHangerExpanded = false;
  public isDontMissOutOnLimitedHangersExpanded = false;

  constructor() { }

  ngOnInit() {
  }

}
