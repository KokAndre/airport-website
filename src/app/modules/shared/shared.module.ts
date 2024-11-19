import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowDividerComponent } from './components/arrow-divider/arrow-divider.component';
import { LiveWeatherWidgetComponent } from './components/live-weather-widget/live-weather-widget.component';
import { MaterialModule } from 'src/app/material.module';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { OnEnterDirective } from 'src/app/directives/on-enter/on-enter.directive';
import { LoginComponent } from 'src/app/components/login/login.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PdfViewerModule,
    FormsModule
  ],
  declarations: [
    ArrowDividerComponent,
    LiveWeatherWidgetComponent,
    FileUploaderComponent,
    ImageUploaderComponent,
    OnEnterDirective,
    LoginComponent
  ],
  exports: [
    ArrowDividerComponent,
    LiveWeatherWidgetComponent,
    FileUploaderComponent,
    ImageUploaderComponent,
    MaterialModule,
    OnEnterDirective,
    LoginComponent,
    PdfViewerModule,
    FormsModule
  ],
  providers: [NgxImageCompressService]
})
export class SharedModule { }
