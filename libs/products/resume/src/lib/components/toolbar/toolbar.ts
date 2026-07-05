import { Component, inject, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResumeService } from '../../services/resume.service';
import { TemplateService } from '../../services/template.service';
import { FontService } from '../../services/font.service';
import { FzProductLogoComponent, FzConfirmModalComponent } from '@fzyrk/ui';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [FormsModule, FzProductLogoComponent, FzConfirmModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toolbar">
      <!-- LEFT -->
      <div class="toolbar-left">
        <div class="logo">
          <fz-product-logo productId="resume" class="logo-product-logo"></fz-product-logo>
          <span class="logo-text">ResumeBuilder</span>
        </div>

        <button class="toolbar-btn resumes-btn" (click)="dashboardRequest.emit()" title="My Resumes">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2h4v5H2zm6 0h6v3H8zM8 7h6v7H8zM2 9h4v5H2z"/>
          </svg>
          My Resumes
        </button>

        <div class="separator"></div>

        <div class="resume-name-wrap">
          <svg class="name-icon" width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
          <input
            type="text"
            class="resume-name-input"
            [ngModel]="resumeService.resumeName()"
            (ngModelChange)="resumeService.updateResumeName($event)"
            placeholder="Resume name"
          />
        </div>
      </div>

      <!-- CENTER -->
      <div class="toolbar-center">
        <!-- Template Selector -->
        <div class="toolbar-group">
          <label class="toolbar-label">Template</label>
          <div class="select-wrap">
            <select
              [ngModel]="resumeService.templateId()"
              (ngModelChange)="resumeService.updateTemplate($event)"
            >
              @for (tpl of templateService.getTemplates(); track tpl.id) {
                <option [value]="tpl.id">{{ tpl.name }}</option>
              }
            </select>
          </div>
        </div>

        <!-- Font Selector -->
        <div class="toolbar-group">
          <label class="toolbar-label">Font</label>
          <div class="select-wrap">
            <select
              [ngModel]="resumeService.fontFamily()"
              (ngModelChange)="resumeService.updateFont($event)"
            >
              @for (font of fontService.getAvailableFonts(); track font.family) {
                <option [value]="font.family">{{ font.label }}</option>
              }
            </select>
          </div>
        </div>

        <!-- Accent Color -->
        <div class="toolbar-group">
          <label class="toolbar-label">Accent</label>
          <div class="color-picker-wrap">
            <div class="color-swatch-ring" [style.--swatch-color]="resumeService.accentColor()">
              <input
                type="color"
                [ngModel]="resumeService.accentColor()"
                (ngModelChange)="resumeService.updateAccentColor($event)"
                class="color-picker"
              />
            </div>
            <span class="color-value">{{ resumeService.accentColor() }}</span>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="toolbar-right">
        <!-- Undo / Redo -->
        <button
          class="toolbar-btn icon-btn"
          (click)="resumeService.undo()"
          [disabled]="!resumeService.canUndo()"
          title="Undo (Ctrl+Z)"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
          </svg>
        </button>
        <button
          class="toolbar-btn icon-btn"
          (click)="resumeService.redo()"
          [disabled]="!resumeService.canRedo()"
          title="Redo (Ctrl+Y)"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
        </button>

        <div class="separator"></div>

        <!-- Export PDF -->
        <button
          class="toolbar-btn export-btn"
          (click)="onExportPdf()"
          [disabled]="exporting()"
          title="Export PDF (Ctrl+P)"
        >
          @if (exporting()) {
            <span class="spinner"></span> Exporting...
          } @else {
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Export PDF
          }
        </button>

        <!-- Reset -->
        <button
          class="toolbar-btn icon-btn reset-btn"
          (click)="showResetModal.set(true)"
          title="Reset resume to default"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Reset Confirm Modal -->
    @if (showResetModal()) {
      <fz-confirm-modal
        title="Reset Resume?"
        message="This will clear all your content and restore the default template. This action cannot be undone."
        variant="danger"
        confirmLabel="Reset"
        cancelLabel="Cancel"
        (confirm)="onResetConfirmed()"
        (cancel)="showResetModal.set(false)"
      />
    }
  `,
  styles: [`
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: 58px;
      background: var(--toolbar-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-color);
      z-index: 100;
      gap: 16px;
    }

    .toolbar-left, .toolbar-center, .toolbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toolbar-left { flex-shrink: 0; }
    .toolbar-center { flex: 1; justify-content: center; gap: 12px; flex-wrap: wrap; }
    .toolbar-right { flex-shrink: 0; }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .logo-product-logo ::ng-deep .product-logo-img {
      width: 26px !important;
      height: 26px !important;
      border-radius: 6px !important;
      box-shadow: none !important;
      border: none !important;
    }
    .logo-text {
      font-size: 0.95rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent), #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      white-space: nowrap;
    }

    .separator {
      width: 1px;
      height: 24px;
      background: var(--border-color);
      flex-shrink: 0;
    }

    .resume-name-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--input-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 0 10px;
      transition: border-color 0.2s;
    }
    .resume-name-wrap:focus-within { border-color: var(--accent); }
    .name-icon { color: var(--text-muted); flex-shrink: 0; }
    .resume-name-input {
      background: transparent;
      border: none;
      padding: 5px 0;
      font-size: 0.83rem;
      font-weight: 500;
      color: var(--text-primary);
      width: 130px;
      font-family: inherit;
    }
    .resume-name-input:focus { outline: none; }

    .toolbar-group {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .toolbar-label {
      font-size: 0.68rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      white-space: nowrap;
    }

    .select-wrap select {
      padding: 5px 26px 5px 9px;
      border: 1px solid var(--border-color);
      border-radius: 7px;
      font-size: 0.78rem;
      background: var(--input-bg);
      color: var(--text-primary);
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 7px center;
      font-family: inherit;
      transition: border-color 0.2s;
    }
    .select-wrap select:focus { outline: none; border-color: var(--accent); }

    .color-picker-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .color-swatch-ring {
      position: relative;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      border: 2px solid var(--border-color);
      overflow: hidden;
      background: var(--swatch-color, #6366f1);
      transition: border-color 0.2s;
      cursor: pointer;
    }
    .color-swatch-ring:hover { border-color: var(--accent); }
    .color-picker {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
    .color-value {
      font-size: 0.7rem;
      color: var(--text-muted);
      font-family: 'Source Code Pro', monospace;
    }

    .toolbar-btn {
      padding: 6px 12px;
      border: 1px solid var(--border-color);
      border-radius: 7px;
      background: var(--input-bg);
      color: var(--text-primary);
      font-size: 0.78rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.18s;
      font-family: inherit;
      white-space: nowrap;
    }
    .toolbar-btn:hover {
      border-color: var(--accent);
      color: var(--accent);
      background: var(--accent-glow);
    }
    .toolbar-btn:disabled {
      opacity: 0.32;
      cursor: not-allowed;
      pointer-events: none;
    }
    .icon-btn { padding: 6px 8px; }

    .export-btn {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
      font-weight: 600;
      padding: 6px 14px;
    }
    .export-btn:hover { filter: brightness(1.12); color: white; background: var(--accent); border-color: var(--accent); }

    .resumes-btn {
      background: linear-gradient(135deg, var(--accent), #a855f7);
      color: white;
      border: none;
      font-weight: 600;
      font-size: 0.76rem;
    }
    .resumes-btn:hover { filter: brightness(1.15); color: white; }

    .reset-btn:hover {
      border-color: #ef4444;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }

    .spinner {
      display: inline-block;
      width: 13px;
      height: 13px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 960px) {
      .toolbar { flex-wrap: wrap; height: auto; padding: 10px 14px; gap: 8px; }
      .toolbar-center { order: 3; width: 100%; justify-content: flex-start; }
      .logo-text { display: none; }
      .color-value { display: none; }
    }
    @media (max-width: 600px) {
      .resume-name-wrap { display: none; }
    }
  `],
})
export class ToolbarComponent {
  readonly resumeService = inject(ResumeService);
  readonly templateService = inject(TemplateService);
  readonly fontService = inject(FontService);

  readonly exportRequest = output<void>();
  readonly dashboardRequest = output<void>();

  readonly exporting = signal(false);
  readonly showResetModal = signal(false);

  async onExportPdf(): Promise<void> {
    this.exporting.set(true);
    try {
      this.exportRequest.emit();
      await new Promise(resolve => setTimeout(resolve, 800));
    } finally {
      this.exporting.set(false);
    }
  }

  onResetConfirmed(): void {
    this.showResetModal.set(false);
    this.resumeService.resetResume();
  }
}
