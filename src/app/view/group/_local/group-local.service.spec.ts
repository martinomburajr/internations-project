/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupLocalService } from './group-local.service';

describe('Service: GroupLocal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupLocalService]
    });
  });

  it('should ...', inject([GroupLocalService], (service: GroupLocalService) => {
    expect(service).toBeTruthy();
  }));
});