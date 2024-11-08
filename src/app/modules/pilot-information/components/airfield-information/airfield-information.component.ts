import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airfield-information',
  templateUrl: './airfield-information.component.html',
  styleUrls: ['./airfield-information.component.scss']
})
export class AirfieldInformationComponent implements OnInit {
  public isHighlightsExpanded = true;
  public isMeetTheTrusteesExpanded = true;
  public isNavigateTedderfieldRulesExpanded = true;
  public isTraditionAndEventsExpanded = true;

  constructor() { }

  ngOnInit() {
  }

}
