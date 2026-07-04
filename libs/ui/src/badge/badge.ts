import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent';

@Component({
  selector: 'fz-badge',
  standalone: true,
  imports: [NgClass],
  template: `
    <span class="badge" [ngClass]="'badge--' + variant">
      @if (dot) { <span class="badge__dot"></span> }
      @else { <ng-content /> }
    </span>
  `,
  styleUrl: './badge.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FzBadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() dot = false;
}
