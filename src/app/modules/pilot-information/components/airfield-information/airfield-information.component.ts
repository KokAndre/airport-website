import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airfield-information',
  templateUrl: './airfield-information.component.html',
  styleUrls: ['./airfield-information.component.scss']
})
export class AirfieldInformationComponent implements OnInit {
  public isHighlightsExpanded = false;
  public isMeetTheTrusteesExpanded = false;
  public isNavigateTedderfieldRulesExpanded = false;
  public isTraditionAndEventsExpanded = false;

  constructor() { }

  ngOnInit() {
  }

}
