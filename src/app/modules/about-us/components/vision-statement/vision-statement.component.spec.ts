/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisionStatementComponent } from './vision-statement.component';

describe('VisionStatementComponent', () => {
  let component: VisionStatementComponent;
  let fixture: ComponentFixture<VisionStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
