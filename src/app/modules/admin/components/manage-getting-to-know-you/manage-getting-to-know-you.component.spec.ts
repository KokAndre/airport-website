/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageGettingToKnowYouComponent } from './manage-getting-to-know-you.component';

describe('ManageGettingToKnowYouComponent', () => {
  let component: ManageGettingToKnowYouComponent;
  let fixture: ComponentFixture<ManageGettingToKnowYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGettingToKnowYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGettingToKnowYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
