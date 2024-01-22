import { TestBed } from '@angular/core/testing';

import { AuthGuardLoggedoutService } from './auth-guard-loggedout.service';

describe('AuthGuardLoggedoutService', () => {
  let service: AuthGuardLoggedoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardLoggedoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
