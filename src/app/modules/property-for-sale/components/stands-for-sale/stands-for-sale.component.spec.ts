/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StandsForSaleComponent } from './stands-for-sale.component';

describe('StandsForSaleComponent', () => {
  let component: StandsForSaleComponent;
  let fixture: ComponentFixture<StandsForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandsForSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandsForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
