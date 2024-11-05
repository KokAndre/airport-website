import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporting-hazards',
  templateUrl: './reporting-hazards.component.html',
  styleUrls: ['./reporting-hazards.component.scss']
})
export class ReportingHazardsComponent implements OnInit {
  public isTopHazardsExpanded = true;

  constructor() { }

  ngOnInit() {
  }

  public togglePannel(pannelToToggle: boolean) {
    return pannelToToggle = !pannelToToggle;
  }

}
