/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FataMerchService } from './fata-merch.service';

describe('Service: FataMerch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FataMerchService]
    });
  });

  it('should ...', inject([FataMerchService], (service: FataMerchService) => {
    expect(service).toBeTruthy();
  }));
});
