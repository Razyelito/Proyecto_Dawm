import { TestBed } from '@angular/core/testing';

import { DashboardAccesoGuard } from './dashboard-acceso.guard';

describe('DashboardAccesoGuard', () => {
  let guard: DashboardAccesoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardAccesoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
