import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() appClickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event.target'])
  @HostListener('document:touchstart', ['$event.target'])
  // @HostListener('document:keydown')

  onClick(event: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(event);
    if (!clickedInside) {
      this.appClickOutside.emit();
    }
  }


}
