/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AbstractLocalService } from './local.service';

describe('Service: Local', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbstractLocalService]
    });
  });

  it('should ...', inject([AbstractLocalService], (service: AbstractLocalService<any>) => {
    expect(service).toBeTruthy();
  }));
});