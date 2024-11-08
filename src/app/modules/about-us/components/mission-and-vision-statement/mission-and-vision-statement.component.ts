import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-and-vision-statement',
  templateUrl: './mission-and-vision-statement.component.html',
  styleUrls: ['./mission-and-vision-statement.component.scss']
})
export class MissionAndVisionStatementComponent implements OnInit {
  public isMissionExpanded = true;
  public isVisionExpanded = true;

  constructor() { }

  ngOnInit() {
  }

}
