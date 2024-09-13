import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow-divider',
  templateUrl: './arrow-divider.component.html',
  styleUrls: ['./arrow-divider.component.scss']
})
export class ArrowDividerComponent implements OnInit {
  @Input() public isLightToDark: boolean;
  @Input() public isSmallDivider: boolean;

  constructor() { }

  ngOnInit() {
  }

}
