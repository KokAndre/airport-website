/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MissionStatementComponent } from './mission-statement.component';

describe('MissionStatementComponent', () => {
  let component: MissionStatementComponent;
  let fixture: ComponentFixture<MissionStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
