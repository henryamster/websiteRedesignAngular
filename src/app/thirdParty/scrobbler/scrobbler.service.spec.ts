import { TestBed } from '@angular/core/testing';

import { ScrobblerService } from './scrobbler.service';

describe('ScrobblerService', () => {
  let service: ScrobblerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrobblerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
