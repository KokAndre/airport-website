import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appIsRouterLinkActive]'
})
export class IsRouterLinkActiveDirective implements AfterViewInit, OnChanges {
  @Input() public navLinkToCheck: string;
  @Input() public currentRoute: string;

  constructor(public router: Router, private el: ElementRef, private renderer: Renderer2) { }


  ngAfterViewInit(): void {
    this.checkIfLinkIsActive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkIfLinkIsActive();
  }

  public checkIfLinkIsActive() {
    // console.log('IN DIRECTIVE: ');
    // console.log('WINDOW LOCATION: ', window.location.pathname);
    // console.log('ROUTER URL: ', this.router.url);

    const linkToCheck = this.router.url ? this.router.url : window.location.pathname;

    // console.log('LINK TO CHECK: ', linkToCheck);

    // console.log('navLinkToCheck: ', this.navLinkToCheck);

    // console.log('ELEMENT: ', this.el.nativeElement);

    if (linkToCheck.includes(this.navLinkToCheck)) {
      // console.log('ADD!!!!');
      this.renderer.addClass(this.el.nativeElement, 'nav-link-active');
    } else {
      // console.log('REMOVE!!!!!!');
      this.renderer.removeClass(this.el.nativeElement, 'nav-link-active');
    }
  }

}
