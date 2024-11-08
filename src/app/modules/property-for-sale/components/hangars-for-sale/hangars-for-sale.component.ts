import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangars-for-sale',
  templateUrl: './hangars-for-sale.component.html',
  styleUrls: ['./hangars-for-sale.component.scss']
})
export class HangarsForSaleComponent implements OnInit {
  public isAviationMeetsCommunityExpanded = true;
  public isWhyInvestInAHangerExpanded = true;
  public isDontMissOutOnLimitedHangersExpanded = true;

  constructor() { }

  ngOnInit() {
  }

}
