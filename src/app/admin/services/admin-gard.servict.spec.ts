import { TestBed } from '@angular/core/testing';

import { AdminGard } from './admin-gard.service';

describe('AdminGardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminGard = TestBed.get(AdminGard);
    expect(service).toBeTruthy();
  });
});
