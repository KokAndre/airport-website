import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-live-weather',
  templateUrl: './live-weather.component.html',
  styleUrls: ['./live-weather.component.scss']
})
export class LiveWeatherComponent implements OnInit {
  public widgetTemplate = '';

  constructor() { }

  ngOnInit() {
    this.fetchWidgetData()
  }

  public fetchWidgetData() {

  }

}
