import { TestBed } from '@angular/core/testing';

import { AppModalService } from './app-modal.service';

describe('AppModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppModalService = TestBed.inject(AppModalService);
    expect(service).toBeTruthy();
  });
});
