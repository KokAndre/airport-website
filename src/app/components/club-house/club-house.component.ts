import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/enums/app.enums';

@Component({
  selector: 'app-club-house',
  templateUrl: './club-house.component.html',
  styleUrls: ['./club-house.component.scss']
})
export class ClubHouseComponent implements OnInit {
  public navigationRoutes = AppRoutes;

  constructor() { }

  ngOnInit() {
  }

}
