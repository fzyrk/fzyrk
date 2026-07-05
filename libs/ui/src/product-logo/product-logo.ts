import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'fz-product-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img 
      [src]="'/logos/' + productId() + 'Logo.png'" 
      [alt]="productId() + ' logo'" 
      class="product-logo-img" 
    />
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .product-logo-img {
      display: block;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      object-fit: cover;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(100, 100, 160, 0.2);
      transition: transform 0.3s var(--fz-ease-spring), box-shadow 0.3s var(--fz-ease-spring), border-color 0.3s;
    }
    :host:hover .product-logo-img {
      transform: scale(1.1) rotate(2deg);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
      border-color: rgba(99, 102, 241, 0.5);
    }
  `]
})
export class FzProductLogoComponent {
  readonly productId = input.required<string>();
}
