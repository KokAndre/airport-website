/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageStandsForSaleInterestComponent } from './manage-stands-for-sale-interest.component';

describe('ManageStandsForSaleInterestComponent', () => {
  let component: ManageStandsForSaleInterestComponent;
  let fixture: ComponentFixture<ManageStandsForSaleInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStandsForSaleInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStandsForSaleInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
