import { TestBed } from '@angular/core/testing';

import { TitreFilService } from './titre-fil.service';

describe('TitreFilService', () => {
  let service: TitreFilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitreFilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
