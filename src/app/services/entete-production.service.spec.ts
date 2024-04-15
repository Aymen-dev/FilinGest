import { TestBed } from '@angular/core/testing';

import { EnteteProductionService } from './entete-production.service';

describe('EnteteProductionService', () => {
  let service: EnteteProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnteteProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
