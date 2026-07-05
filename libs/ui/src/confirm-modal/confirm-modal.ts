import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'fz-confirm-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fz-modal-overlay" (click)="onOverlayClick($event)">
      <div class="fz-modal-box" role="dialog" [attr.aria-label]="title()">

        <!-- Icon -->
        <div class="fz-modal-icon" [class]="'fz-modal-icon--' + variant()">
          @if (variant() === 'danger') {
            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          } @else if (variant() === 'warning') {
            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>
          } @else {
            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          }
        </div>

        <!-- Text -->
        <div class="fz-modal-body">
          <h3 class="fz-modal-title">{{ title() }}</h3>
          @if (message()) {
            <p class="fz-modal-message">{{ message() }}</p>
          }
        </div>

        <!-- Actions -->
        <div class="fz-modal-actions">
          <button class="fz-modal-btn fz-modal-btn--cancel" (click)="cancel.emit()">
            {{ cancelLabel() }}
          </button>
          <button
            class="fz-modal-btn"
            [class]="'fz-modal-btn--' + variant()"
            (click)="confirm.emit()"
            autofocus
          >
            {{ confirmLabel() }}
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .fz-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fzOverlayIn 0.18s ease both;
    }

    .fz-modal-box {
      background: var(--sidebar-bg, #1e1e2e);
      border: 1px solid var(--border-color, rgba(255,255,255,0.1));
      border-radius: 18px;
      padding: 28px 28px 24px;
      width: 92%;
      max-width: 400px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
      animation: fzModalIn 0.25s cubic-bezier(0.34, 1.5, 0.64, 1) both;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 14px;
    }

    /* Icon */
    .fz-modal-icon {
      width: 54px;
      height: 54px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .fz-modal-icon--danger {
      background: rgba(239, 68, 68, 0.12);
      color: #ef4444;
    }
    .fz-modal-icon--warning {
      background: rgba(245, 158, 11, 0.12);
      color: #f59e0b;
    }
    .fz-modal-icon--info {
      background: rgba(99, 102, 241, 0.12);
      color: var(--accent, #6366f1);
    }

    /* Text */
    .fz-modal-body {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .fz-modal-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary, #f0f0f5);
      margin: 0;
    }
    .fz-modal-message {
      font-size: 0.83rem;
      color: var(--text-muted, #888);
      margin: 0;
      line-height: 1.5;
    }

    /* Actions */
    .fz-modal-actions {
      display: flex;
      gap: 10px;
      width: 100%;
      margin-top: 4px;
    }
    .fz-modal-btn {
      flex: 1;
      padding: 9px 16px;
      border-radius: 9px;
      font-size: 0.85rem;
      font-weight: 600;
      border: 1px solid var(--border-color, rgba(255,255,255,0.1));
      cursor: pointer;
      transition: all 0.18s;
      font-family: inherit;
    }
    .fz-modal-btn--cancel {
      background: var(--input-bg, rgba(255,255,255,0.06));
      color: var(--text-secondary, #aaa);
    }
    .fz-modal-btn--cancel:hover {
      background: var(--card-bg, rgba(255,255,255,0.1));
      color: var(--text-primary, #f0f0f5);
    }
    .fz-modal-btn--danger {
      background: #ef4444;
      color: white;
      border-color: #ef4444;
    }
    .fz-modal-btn--danger:hover { filter: brightness(1.12); }

    .fz-modal-btn--warning {
      background: #f59e0b;
      color: white;
      border-color: #f59e0b;
    }
    .fz-modal-btn--warning:hover { filter: brightness(1.12); }

    .fz-modal-btn--info {
      background: var(--accent, #6366f1);
      color: white;
      border-color: var(--accent, #6366f1);
    }
    .fz-modal-btn--info:hover { filter: brightness(1.12); }

    @keyframes fzOverlayIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fzModalIn {
      from { opacity: 0; transform: scale(0.92) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
  `],
})
export class FzConfirmModalComponent {
  /** Modal title — short, direct label */
  readonly title = input.required<string>();
  /** Optional body text with more detail */
  readonly message = input('');
  /** Controls icon color and confirm button color */
  readonly variant = input<'danger' | 'warning' | 'info'>('danger');
  /** Label for the cancel button */
  readonly cancelLabel = input('Cancel');
  /** Label for the confirm button */
  readonly confirmLabel = input('Confirm');

  readonly confirm = output<void>();
  readonly cancel = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.cancel.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    // Only close if clicking directly on the overlay backdrop (not the modal box)
    if ((event.target as HTMLElement).classList.contains('fz-modal-overlay')) {
      this.cancel.emit();
    }
  }
}
