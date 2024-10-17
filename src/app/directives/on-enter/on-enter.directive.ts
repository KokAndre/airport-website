import { Directive, ElementRef, HostListener, Input } from '@angular/core';

export enum KEY_CODE {
  ENTER = 13,
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39,
}

export enum KEY_CODE_NAME {
  ENTER = 'ENTER',
  ARROW_LEFT = 'ARROWLEFT',
  ARROW_RIGHT = 'ARROWRIGHT',
}

@Directive({
  selector: '[appOnEnter]'
})
export class OnEnterDirective {
  @Input() isButtonFocused: boolean;

  constructor(private el: ElementRef) { }

  @HostListener('window:keyup', ['$event'])

  keyEvent(event: KeyboardEvent) {
    // Multi browser support
    const key = event.key?.toUpperCase() || event.keyCode;

    if (this.isButtonFocused) {
      if (key === KEY_CODE.ENTER || key === KEY_CODE_NAME.ENTER) {
        this.el.nativeElement.click();
      }
    }

  }

}
