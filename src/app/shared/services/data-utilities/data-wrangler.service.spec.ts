import { TestBed } from '@angular/core/testing';

import { DataWranglerService } from './data-wrangler.service';

describe('DataWranglerService', () => {
  let service: DataWranglerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataWranglerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
