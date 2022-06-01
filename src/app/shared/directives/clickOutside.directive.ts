import { AfterViewInit, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[clickOut]',
})
export class ClickOutsideDirective implements AfterViewInit {
  _element: any;
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() clickOut!: any;

  @Output() clickOutEvent: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('document:mousedown', ['$event']) onMouseDown(event: any) {
    if (this.clickOut && !event.path.includes(this._element.nativeElement)) {
      this.clickOutEvent.emit();
    }
  }
}
