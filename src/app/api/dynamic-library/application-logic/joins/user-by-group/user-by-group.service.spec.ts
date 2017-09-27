/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserByGroupService } from './user-by-group.service';

describe('Service: UserByGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserByGroupService]
    });
  });

  it('should ...', inject([UserByGroupService], (service: UserByGroupService) => {
    expect(service).toBeTruthy();
  }));
});