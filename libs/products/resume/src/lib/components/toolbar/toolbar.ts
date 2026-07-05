import { Component, inject, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResumeService } from '../../services/resume.service';
import { TemplateService } from '../../services/template.service';
import { FontService } from '../../services/font.service';
import { ExportService } from '../../services/export.service';
import { FzProductLogoComponent } from '@fzyrk/ui';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [FormsModule, FzProductLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="logo">
          <fz-product-logo productId="resume" class="logo-product-logo"></fz-product-logo>
          <span class="logo-text">ResumeBuilder</span>
        </div>
        <button class="toolbar-btn resumes-btn" (click)="dashboardRequest.emit()" title="My Resumes">
          <span>📂</span> My Resumes
        </button>
        <div class="separator"></div>
        <div class="resume-name-wrap">
          <input
            type="text"
            class="resume-name-input"
            [ngModel]="resumeService.resumeName()"
            (ngModelChange)="resumeService.updateResumeName($event)"
            placeholder="Resume name"
          />
        </div>
      </div>

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
            <input
              type="color"
              [ngModel]="resumeService.accentColor()"
              (ngModelChange)="resumeService.updateAccentColor($event)"
              class="color-picker"
            />
            <span class="color-value">{{ resumeService.accentColor() }}</span>
          </div>
        </div>
      </div>

      <div class="toolbar-right">
        <!-- Undo/Redo -->
        <button class="toolbar-btn icon-btn" (click)="resumeService.undo()" title="Undo (Ctrl+Z)">
          <span>↶</span>
        </button>
        <button class="toolbar-btn icon-btn" (click)="resumeService.redo()" title="Redo (Ctrl+Y)">
          <span>↷</span>
        </button>

        <div class="separator"></div>

        <!-- Export PDF -->
        <button class="toolbar-btn export-btn" (click)="onExportPdf()" [disabled]="exporting">
          @if (exporting) {
            <span class="spinner"></span> Exporting...
          } @else {
            <span>📥</span> Export PDF
          }
        </button>

        <!-- Reset -->
        <button class="toolbar-btn reset-btn" (click)="onReset()" title="Reset to default">
          <span>🔄</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: 60px;
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
      gap: 12px;
    }

    .toolbar-left { flex-shrink: 0; }
    .toolbar-center { flex: 1; justify-content: center; gap: 16px; flex-wrap: wrap; }
    .toolbar-right { flex-shrink: 0; }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .logo-product-logo ::ng-deep .product-logo-img {
      width: 28px !important;
      height: 28px !important;
      border-radius: 6px !important;
      box-shadow: none !important;
      border: none !important;
    }
    .logo-text {
      font-size: 1rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent), #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .separator {
      width: 1px;
      height: 28px;
      background: var(--border-color);
    }

    .resume-name-input {
      background: transparent;
      border: 1px solid transparent;
      padding: 4px 8px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-primary);
      border-radius: 6px;
      width: 140px;
      transition: all 0.2s;
      font-family: inherit;
    }
    .resume-name-input:hover { border-color: var(--border-color); }
    .resume-name-input:focus { outline: none; border-color: var(--accent); background: var(--input-bg); }

    .toolbar-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .toolbar-label {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text-muted);
      white-space: nowrap;
    }

    .select-wrap select {
      padding: 5px 28px 5px 10px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 0.8rem;
      background: var(--input-bg);
      color: var(--text-primary);
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 8px center;
      font-family: inherit;
      transition: border-color 0.2s;
    }
    .select-wrap select:focus { outline: none; border-color: var(--accent); }

    .color-picker-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .color-picker {
      width: 28px;
      height: 28px;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      padding: 0;
      cursor: pointer;
      background: none;
    }
    .color-picker::-webkit-color-swatch-wrapper { padding: 2px; }
    .color-picker::-webkit-color-swatch { border-radius: 4px; border: none; }
    .color-value { font-size: 0.72rem; color: var(--text-muted); font-family: 'Source Code Pro', monospace; }

    .toolbar-btn {
      padding: 6px 14px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--input-bg);
      color: var(--text-primary);
      font-size: 0.8rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      font-family: inherit;
      white-space: nowrap;
    }
    .toolbar-btn:hover { border-color: var(--accent); color: var(--accent); }
    .toolbar-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .icon-btn { padding: 6px 8px; font-size: 1rem; }

    .export-btn {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
      font-weight: 600;
    }
    .export-btn:hover { filter: brightness(1.1); color: white; }

    .reset-btn { padding: 6px 10px; }

    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

      .resumes-btn {
        background: linear-gradient(135deg, var(--accent), #a855f7);
        color: white;
        border: none;
        font-weight: 600;
        font-size: 0.78rem;
      }
      .resumes-btn:hover { filter: brightness(1.15); color: white; }

      @media (max-width: 900px) {
        .toolbar { flex-wrap: wrap; height: auto; padding: 10px 16px; gap: 10px; }
        .toolbar-center { order: 3; width: 100%; justify-content: flex-start; }
        .logo-text { display: none; }
        .color-value { display: none; }
      }
  `],
})
export class ToolbarComponent {
  readonly resumeService = inject(ResumeService);
  readonly templateService = inject(TemplateService);
  readonly fontService = inject(FontService);
  private readonly exportService = inject(ExportService);

  readonly exportRequest = output<void>();
  readonly dashboardRequest = output<void>();
  exporting = false;

  async onExportPdf(): Promise<void> {
    this.exportRequest.emit();
  }

  onReset(): void {
    if (confirm('Reset resume to default? This cannot be undone.')) {
      this.resumeService.resetResume();
    }
  }
}
