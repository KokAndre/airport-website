import { TestBed } from '@angular/core/testing';

import { WordDocumentService } from './word-document.service';

describe('WordDocumentService', () => {
  let service: WordDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
