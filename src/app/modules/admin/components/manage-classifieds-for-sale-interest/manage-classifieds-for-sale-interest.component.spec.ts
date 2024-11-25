/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageClassifiedsForSaleInterestComponent } from './manage-classifieds-for-sale-interest.component';

describe('ManageClassifiedsForSaleInterestComponent', () => {
  let component: ManageClassifiedsForSaleInterestComponent;
  let fixture: ComponentFixture<ManageClassifiedsForSaleInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageClassifiedsForSaleInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClassifiedsForSaleInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
