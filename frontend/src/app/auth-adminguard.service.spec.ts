import { TestBed } from '@angular/core/testing';

import { AuthAdminguardService } from './auth-adminguard.service';

describe('AuthAdminguardService', () => {
  let service: AuthAdminguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAdminguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
