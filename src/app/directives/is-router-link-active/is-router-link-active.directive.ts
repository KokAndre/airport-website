import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appIsRouterLinkActive]'
})
export class IsRouterLinkActiveDirective implements AfterViewInit, OnChanges {
  @Input() public navLinkToCheck: string;
  @Input() public currentRoute: string;
  @Input() public isMobileView: boolean;

  constructor(public router: Router, private el: ElementRef, private renderer: Renderer2) { }


  ngAfterViewInit(): void {
    this.checkIfLinkIsActive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkIfLinkIsActive();
  }

  public checkIfLinkIsActive() {
    const linkToCheck = this.router.url ? this.router.url : window.location.pathname;

    if (linkToCheck.includes(this.navLinkToCheck)) {
      this.renderer.addClass(this.el.nativeElement, this.isMobileView ? 'nav-link-active-mobile' : 'nav-link-active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nav-link-active');
      this.renderer.removeClass(this.el.nativeElement, 'nav-link-active-mobile');
    }
  }

}
