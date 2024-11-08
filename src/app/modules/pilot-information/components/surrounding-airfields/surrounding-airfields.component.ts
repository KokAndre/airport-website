import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-surrounding-airfields',
  templateUrl: './surrounding-airfields.component.html',
  styleUrls: ['./surrounding-airfields.component.scss']
})
export class SurroundingAirfieldsComponent implements OnInit {
  public isRandAirportExpanded = true;
  public isGrandCentralExpanded = true;
  public isLanseriaExpanded = true;
  public isPanoramaExpanded = true;
  public isKliprivierExpanded = true;
  public isBaragwanathExpanded = true;
  public isVereenigingExpanded = true;
  public isSpringsExpanded = true;
  public isConclusionExpanded = true;

  constructor() { }

  ngOnInit() {
  }

}
