import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceHolderComponent } from './components/place-holder/place-holder.component';

const routes: Routes = [
  {
    path: '', component: PlaceHolderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyForSaleRoutingModule { }
