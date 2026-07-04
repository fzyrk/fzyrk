import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';

export type CardVariant = 'default' | 'glass' | 'elevated' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'fz-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FzCardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() hoverable = false;
  @Input() clickable = false;
  @Input() padding: CardPadding = 'md';

  @Output() cardClick = new EventEmitter<void>();

  get classes(): Record<string, boolean> {
    return {
      [`card--${this.variant}`]: true,
      [`card--pad-${this.padding}`]: true,
      'card--hoverable': this.hoverable,
      'card--clickable': this.clickable,
    };
  }

  onClick(): void {
    if (this.clickable) this.cardClick.emit();
  }
}
