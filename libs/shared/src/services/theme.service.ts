import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

/**
 * ThemeService — manages dark/light mode, persists to localStorage.
 * The theme is applied as a class on <html>.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'fzyrk-theme';

  theme = signal<Theme>(this.getStoredTheme());

  constructor() {
    // Apply theme class on change safely
    effect(() => {
      const t = this.theme();
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', t);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, t);
      }
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  setTheme(t: Theme): void {
    this.theme.set(t);
  }

  get isDark(): boolean {
    return this.theme() === 'dark';
  }

  private getStoredTheme(): Theme {
    if (typeof localStorage === 'undefined') return 'dark';
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === 'light') return 'light';
    return 'dark';
  }
}
