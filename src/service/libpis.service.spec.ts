import { TestBed } from '@angular/core/testing';

import { LibpisService } from './libpis.service';

describe('LibpisService', () => {
  let service: LibpisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibpisService],
    });
    service = TestBed.inject(LibpisService);
  });
});
