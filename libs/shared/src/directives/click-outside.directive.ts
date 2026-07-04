import { Directive, ElementRef, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';

/**
 * fzClickOutside — emits when a click occurs outside the host element.
 * Usage: <div fzClickOutside (clickedOutside)="close()">...</div>
 */
@Directive({
  selector: '[fzClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Output() clickedOutside = new EventEmitter<void>();

  private handler = (event: MouseEvent) => {
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.clickedOutside.emit();
    }
  };

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    // Use setTimeout to avoid triggering on the same click that opened the element
    setTimeout(() => document.addEventListener('click', this.handler), 0);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handler);
  }
}
