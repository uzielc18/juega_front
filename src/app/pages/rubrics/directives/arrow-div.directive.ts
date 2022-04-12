import { Directive, HostListener, ElementRef } from '@angular/core';
import { KeyBoardService } from '../services/keyboard.service';

@Directive({
  selector: '[arrow-div]',
})
export class ArrowDirective {
  constructor(private keyboardService: KeyBoardService, public element: ElementRef) {}

  //@Output() arrowEvent:EventEmitter<any>=new EventEmitter();

  @HostListener('keydown', ['$event']) onKeyUp(e: any) {
    switch (e.keyCode) {
      case 38:
        this.keyboardService.sendMessage({ element: this.element, action: 'UP' });
        break;
      case 37:
        if (this.element.nativeElement.selectionStart === undefined || this.element.nativeElement.selectionStart <= 0) {
          this.keyboardService.sendMessage({ element: this.element, action: 'LEFT' });
          e.preventDefault();
        }
        break;
      case 40:
        this.keyboardService.sendMessage({ element: this.element, action: 'DOWN' });
        break;
      case 39:
        if (
          this.element.nativeElement.selectionStart === undefined ||
          this.element.nativeElement.selectionStart >= this.element.nativeElement.value.length
        ) {
          this.keyboardService.sendMessage({ element: this.element, action: 'RIGTH' });
          e.preventDefault();
        }
        break;
    }
  }
}
