/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GreeningTedderfieldRequestsComponent } from './greening-tedderfield-requests.component';

describe('GreeningTedderfieldRequestsComponent', () => {
  let component: GreeningTedderfieldRequestsComponent;
  let fixture: ComponentFixture<GreeningTedderfieldRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreeningTedderfieldRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreeningTedderfieldRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
