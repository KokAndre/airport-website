/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TedderfieldMerchHubComponent } from './tedderfield-merch-hub.component';

describe('TedderfieldMerchHubComponent', () => {
  let component: TedderfieldMerchHubComponent;
  let fixture: ComponentFixture<TedderfieldMerchHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TedderfieldMerchHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TedderfieldMerchHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
