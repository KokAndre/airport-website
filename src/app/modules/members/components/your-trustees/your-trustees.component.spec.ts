/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { YourTrusteesComponent } from './your-trustees.component';

describe('YourTrusteesComponent', () => {
  let component: YourTrusteesComponent;
  let fixture: ComponentFixture<YourTrusteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourTrusteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourTrusteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
