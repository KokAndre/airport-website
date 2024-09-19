import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowDividerComponent } from './components/arrow-divider/arrow-divider.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ArrowDividerComponent],
  exports: [ArrowDividerComponent]
})
export class SharedModule { }
