import { TestBed } from '@angular/core/testing';

import { LibpisService } from './libpis.service';

describe('LibpisService', () => {
  let service: LibpisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibpisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
