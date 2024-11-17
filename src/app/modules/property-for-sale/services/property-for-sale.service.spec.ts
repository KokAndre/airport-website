/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PropertyForSaleService } from './property-for-sale.service';

describe('Service: PropertyForSale', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyForSaleService]
    });
  });

  it('should ...', inject([PropertyForSaleService], (service: PropertyForSaleService) => {
    expect(service).toBeTruthy();
  }));
});
