/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AbstractJoinService } from './abstract-join.service';

describe('Service: AbstractJoin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbstractJoinService]
    });
  });

  it('should ...', inject([AbstractJoinService], (service: AbstractJoinService) => {
    expect(service).toBeTruthy();
  }));
});