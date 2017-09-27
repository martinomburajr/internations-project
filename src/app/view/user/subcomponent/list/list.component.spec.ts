import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  

  beforeEach(async(() => {
    let userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };
    let groupServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };
    let userService = TestBed.get(UserService);
    let groupService = TestBed.get(GroupService);
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [{provide: UserService, useValue: userServiceStub}, {provide: GroupService, useValue: groupServiceStub}]
    })

    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
