/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AirfieldComponent } from './airfield.component';

describe('AirfieldComponent', () => {
  let component: AirfieldComponent;
  let fixture: ComponentFixture<AirfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
