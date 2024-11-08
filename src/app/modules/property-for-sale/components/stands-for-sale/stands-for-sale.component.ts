import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stands-for-sale',
  templateUrl: './stands-for-sale.component.html',
  styleUrls: ['./stands-for-sale.component.scss']
})
export class StandsForSaleComponent implements OnInit {
  public isBuildYourDreamsExpanded = true;
  public isWhyChooseTedderfieldExpanded = true;
  public isStandsAreLimitedExpanded = true;

  constructor() { }

  ngOnInit() {
  }

}
