import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { FzIconComponent } from '@fzyrk/icons';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * FzButton — Fzyrk UI button with variants, sizes, loading state.
 * Usage: <fz-button variant="primary" (clicked)="onSave()">Save</fz-button>
 */
@Component({
  selector: 'fz-button',
  standalone: true,
  imports: [NgClass, FzIconComponent],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FzButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() iconRight = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  get classes(): Record<string, boolean> {
    return {
      [`btn--${this.variant}`]: true,
      [`btn--${this.size}`]: true,
      'btn--loading': this.loading,
      'btn--full': this.fullWidth,
    };
  }
}
