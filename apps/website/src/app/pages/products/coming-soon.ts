import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coming-soon-product',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="coming-soon">
      <div class="coming-soon__content">
        <span class="coming-soon__icon">🚀</span>
        <h1 class="coming-soon__title fz-display">Coming <span class="fz-gradient-text">Soon</span></h1>
        <p class="coming-soon__text">We are hard at work building this product to elevate your career. Follow our journey on the roadmap.</p>
        <div class="coming-soon__actions">
          <a routerLink="/" class="btn btn--primary">Back to Home</a>
          <a routerLink="/products" class="btn btn--outline">View All Products</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .coming-soon {
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--fz-space-12) 0;
      text-align: center;
    }
    .coming-soon__content {
      max-width: 480px;
      padding: var(--fz-space-10);
      background: var(--fz-bg-glass);
      border: 1px solid var(--fz-border-glow);
      border-radius: var(--fz-radius-2xl);
      box-shadow: var(--fz-shadow-glow-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--fz-space-6);
    }
    .coming-soon__icon {
      font-size: 3.5rem;
      line-height: 1;
    }
    .coming-soon__title {
      font-size: var(--fz-text-4xl);
    }
    .coming-soon__text {
      color: var(--fz-text-secondary);
      font-size: var(--fz-text-base);
      line-height: var(--fz-leading-relaxed);
    }
    .coming-soon__actions {
      display: flex;
      gap: var(--fz-space-4);
    }
    @media (max-width: 480px) {
      .coming-soon__actions {
        flex-direction: column;
        width: 100%;
      }
      .coming-soon__actions .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ComingSoonProductComponent {}
