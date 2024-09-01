/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlyAwaysComponent } from './fly-aways.component';

describe('FlyAwaysComponent', () => {
  let component: FlyAwaysComponent;
  let fixture: ComponentFixture<FlyAwaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyAwaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyAwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
