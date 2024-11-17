/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageHangersForSaleInterestComponent } from './manage-hangers-for-sale-interest.component';

describe('ManageHangersForSaleInterestComponent', () => {
  let component: ManageHangersForSaleInterestComponent;
  let fixture: ComponentFixture<ManageHangersForSaleInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHangersForSaleInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHangersForSaleInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
