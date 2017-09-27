import { SimpleMasterDetailContainer } from '../../container/master-detal/simple/master-detail-container';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MasterDetailTemplate } from './master-detail.component';

describe('MasterDetailTemplate', () => {
  let component: MasterDetailTemplate;
  let fixture: ComponentFixture<MasterDetailTemplate>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDetailTemplate, SimpleMasterDetailContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
