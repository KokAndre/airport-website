/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HangarRentingComponent } from './hangar-renting.component';

describe('HangarRentingComponent', () => {
  let component: HangarRentingComponent;
  let fixture: ComponentFixture<HangarRentingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangarRentingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangarRentingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
