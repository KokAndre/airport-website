/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WhosWhoInTheZooComponent } from './whos-who-in-the-zoo.component';

describe('WhosWhoInTheZooComponent', () => {
  let component: WhosWhoInTheZooComponent;
  let fixture: ComponentFixture<WhosWhoInTheZooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhosWhoInTheZooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhosWhoInTheZooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
