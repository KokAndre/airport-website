/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HasCompletedGettingToKnowYouGuardService } from './has-completed-getting-to-know-you-guard.service';

describe('Service: HasCompletedGettingToKnowYouGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasCompletedGettingToKnowYouGuardService]
    });
  });

  it('should ...', inject([HasCompletedGettingToKnowYouGuardService], (service: HasCompletedGettingToKnowYouGuardService) => {
    expect(service).toBeTruthy();
  }));
});
