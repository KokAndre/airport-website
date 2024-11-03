/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageHomeScreenBannerComponent } from './manage-home-screen-banner.component';

describe('ManageHomeScreenBannerComponent', () => {
  let component: ManageHomeScreenBannerComponent;
  let fixture: ComponentFixture<ManageHomeScreenBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHomeScreenBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeScreenBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
