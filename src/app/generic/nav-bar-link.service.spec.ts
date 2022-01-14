import { TestBed } from '@angular/core/testing';

import { NavBarLinkService } from './nav-bar-link.service';

describe('NavBarLinkService', () => {
  let service: NavBarLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavBarLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
