import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

/**
 * fzScrollReveal — adds `.visible` class when element enters viewport.
 * Usage: <div fzScrollReveal class="fz-reveal">...</div>
 */
@Directive({
  selector: '[fzScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() fzScrollRevealThreshold = 0.1;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.el.nativeElement.classList.add('fz-reveal');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('visible');
          // Once visible, stop observing
          this.observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: this.fzScrollRevealThreshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
