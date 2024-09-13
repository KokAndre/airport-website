/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { IsRouterLinkActiveDirective } from './is-router-link-active.directive';
import { Router } from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Directive: IsRouterLinkActive', () => {
  it('should create an instance', () => {
    const directive = new IsRouterLinkActiveDirective();
    expect(directive).toBeTruthy();
  });
});
