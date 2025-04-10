/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageTedderfieldMerchHubComponent } from './manage-tedderfield-merch-hub.component';

describe('ManageTedderfieldMerchHubComponent', () => {
  let component: ManageTedderfieldMerchHubComponent;
  let fixture: ComponentFixture<ManageTedderfieldMerchHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTedderfieldMerchHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTedderfieldMerchHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
