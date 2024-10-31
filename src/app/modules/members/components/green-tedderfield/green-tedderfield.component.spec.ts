/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GreenTedderfieldComponent } from './green-tedderfield.component';

describe('GreenTedderfieldComponent', () => {
  let component: GreenTedderfieldComponent;
  let fixture: ComponentFixture<GreenTedderfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenTedderfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenTedderfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
