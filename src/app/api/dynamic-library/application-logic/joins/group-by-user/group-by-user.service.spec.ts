/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupByUserService } from './group-by-user.service';

describe('Service: GroupByUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupByUserService]
    });
  });

  it('should ...', inject([GroupByUserService], (service: GroupByUserService) => {
    expect(service).toBeTruthy();
  }));
});