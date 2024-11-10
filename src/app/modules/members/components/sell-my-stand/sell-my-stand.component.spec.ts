/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellMyStandComponent } from './sell-my-stand.component';

describe('SellMyStandComponent', () => {
  let component: SellMyStandComponent;
  let fixture: ComponentFixture<SellMyStandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellMyStandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellMyStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
