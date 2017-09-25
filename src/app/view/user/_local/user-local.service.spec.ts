/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserLocalService } from './user-local.service';

describe('Service: UserLocal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLocalService]
    });
  });

  it('should ...', inject([UserLocalService], (service: UserLocalService) => {
    expect(service).toBeTruthy();
  }));
});