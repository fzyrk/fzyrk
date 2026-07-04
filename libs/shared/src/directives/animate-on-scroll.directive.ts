import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

/**
 * fzAnimateOnScroll — triggers a CSS animation class when element enters viewport.
 * Usage: <div fzAnimateOnScroll animationClass="fz-animate-fade-in">...</div>
 */
@Directive({
  selector: '[fzAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() animationClass = 'fz-animate-fade-in';
  @Input() threshold = 0.1;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add(this.animationClass);
          this.observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: this.threshold }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
