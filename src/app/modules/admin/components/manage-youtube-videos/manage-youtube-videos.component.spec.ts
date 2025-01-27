/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageYoutubeVideosComponent } from './manage-youtube-videos.component';

describe('ManageYoutubeVideosComponent', () => {
  let component: ManageYoutubeVideosComponent;
  let fixture: ComponentFixture<ManageYoutubeVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageYoutubeVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageYoutubeVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
