/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CaptureGettingToKnowYouComponent } from './capture-getting-to-know-you.component';

describe('CaptureGettingToKnowYouComponent', () => {
  let component: CaptureGettingToKnowYouComponent;
  let fixture: ComponentFixture<CaptureGettingToKnowYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureGettingToKnowYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureGettingToKnowYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
