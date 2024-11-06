import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-surrounding-airfields',
  templateUrl: './surrounding-airfields.component.html',
  styleUrls: ['./surrounding-airfields.component.scss']
})
export class SurroundingAirfieldsComponent implements OnInit {
  public isRandAirportExpanded = false;
  public isGrandCentralExpanded = false;
  public isLanseriaExpanded = false;
  public isPanoramaExpanded = false;
  public isKliprivierExpanded = false;
  public isBaragwanathExpanded = false;
  public isVereenigingExpanded = false;
  public isSpringsExpanded = false;
  public isConclusionExpanded = false;

  constructor() { }

  ngOnInit() {
  }

}
