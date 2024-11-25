/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageClassifiedsForSaleComponent } from './manage-classifieds-for-sale.component';

describe('ManageClassifiedsForSaleComponent', () => {
  let component: ManageClassifiedsForSaleComponent;
  let fixture: ComponentFixture<ManageClassifiedsForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageClassifiedsForSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClassifiedsForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
