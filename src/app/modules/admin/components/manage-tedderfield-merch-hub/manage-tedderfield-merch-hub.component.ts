import { Component, OnInit } from '@angular/core';
import { GetMerchHubDataResponse } from 'src/app/models/get-mergch-hub-data-response.model';

@Component({
  selector: 'app-manage-tedderfield-merch-hub',
  templateUrl: './manage-tedderfield-merch-hub.component.html',
  styleUrls: ['./manage-tedderfield-merch-hub.component.scss']
})
export class ManageTedderfieldMerchHubComponent implements OnInit {
  public isLoading = true;
  public merchHubItems: GetMerchHubDataResponse.MerchItem[];

  constructor() { }

  ngOnInit() {
  }

  public addItemClicked() {
    //
  }
}
