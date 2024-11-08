import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stands-for-sale',
  templateUrl: './stands-for-sale.component.html',
  styleUrls: ['./stands-for-sale.component.scss']
})
export class StandsForSaleComponent implements OnInit {
  public isBuildYourDreamsExpanded = false;
  public isWhyChooseTedderfieldExpanded = false;
  public isStandsAreLimitedExpanded = false;

  constructor() { }

  ngOnInit() {
  }

}
