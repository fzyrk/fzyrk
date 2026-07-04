import { Injectable, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, startWith, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINTS: Record<Breakpoint, number> = {
  'xs':  0,
  'sm':  640,
  'md':  768,
  'lg':  1024,
  'xl':  1280,
  '2xl': 1536,
};

/**
 * BreakpointService — reactive screen size signals.
 */
@Injectable({ providedIn: 'root' })
export class BreakpointService {
  breakpoint = signal<Breakpoint>(this.getCurrentBreakpoint());
  isMobile   = signal(this.getWidth() < 768);
  isTablet   = signal(this.getWidth() >= 768 && this.getWidth() < 1024);
  isDesktop  = signal(this.getWidth() >= 1024);

  constructor() {
    if (typeof window !== 'undefined') {
      fromEvent(window, 'resize').pipe(
        startWith(null),
        map(() => this.getWidth()),
        distinctUntilChanged(),
        takeUntilDestroyed()
      ).subscribe(() => {
        const w = this.getWidth();
        this.breakpoint.set(this.getCurrentBreakpoint());
        this.isMobile.set(w < 768);
        this.isTablet.set(w >= 768 && w < 1024);
        this.isDesktop.set(w >= 1024);
      });
    }
  }

  private getWidth(): number {
    return typeof window !== 'undefined' ? window.innerWidth : 1024;
  }

  private getCurrentBreakpoint(): Breakpoint {
    const w = this.getWidth();
    if (w >= 1536) return '2xl';
    if (w >= 1280) return 'xl';
    if (w >= 1024) return 'lg';
    if (w >= 768)  return 'md';
    if (w >= 640)  return 'sm';
    return 'xs';
  }
}
