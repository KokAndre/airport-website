import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowDividerComponent } from './components/arrow-divider/arrow-divider.component';
import { LiveWeatherWidgetComponent } from './components/live-weather-widget/live-weather-widget.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ArrowDividerComponent,
    LiveWeatherWidgetComponent
  ],
  exports: [
    ArrowDividerComponent,
    LiveWeatherWidgetComponent
  ]
})
export class SharedModule { }
