import { Component, inject, viewChild, signal, HostListener, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { SidebarComponent } from './components/sidebar/sidebar';
import { EditorComponent } from './components/editor/editor';
import { PreviewComponent } from './components/preview/preview';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ResumeService } from './services/resume.service';
import { ExportService } from './services/export.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToolbarComponent, SidebarComponent, EditorComponent, PreviewComponent, DashboardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './resume.css',
  template: `
    <div class="app-shell">
      <app-toolbar (exportRequest)="exportPdf()" (dashboardRequest)="showDashboard.set(true)" />
      <div class="app-body" [style.--editor-width.px]="editorWidth()">
        <app-sidebar />
        <app-editor />
        <div class="editor-resizer" (mousedown)="startResize($event)"></div>
        <app-preview />
      </div>
    </div>

    @if (showDashboard()) {
      <app-dashboard (close)="showDashboard.set(false)" />
    }

    <!-- Toast Container -->
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast-message" [class]="toast.type" (click)="toastService.remove(toast.id)">
          <span class="toast-icon">
            @if (toast.type === 'success') {
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#22c55e">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            } @else if (toast.type === 'danger') {
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#ef4444">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            } @else {
              <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--accent)">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
              </svg>
            }
          </span>
          <span class="toast-text">{{ toast.message }}</span>
          <button class="toast-close">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .app-shell {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
      background: var(--app-bg);
    }

    .app-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    app-editor {
      width: var(--editor-width, 520px);
      flex: 0 0 var(--editor-width, 520px) !important;
    }

    .editor-resizer {
      width: 6px;
      cursor: col-resize;
      background: transparent;
      transition: background 0.15s;
      position: relative;
      z-index: 10;
      flex-shrink: 0;
    }
    .editor-resizer::after {
      content: '';
      position: absolute;
      left: 2px;
      top: 0;
      bottom: 0;
      width: 1px;
      background: var(--border-color);
      pointer-events: none;
    }
    .editor-resizer:hover, .editor-resizer:active {
      background: var(--accent);
    }
    .editor-resizer:hover::after, .editor-resizer:active::after {
      background: transparent;
    }

    @media (max-width: 768px) {
      .app-body {
        flex-direction: column;
      }
      app-editor {
        width: 100% !important;
        flex: 1 !important;
      }
      .editor-resizer {
        display: none !important;
      }
    }

    /* ── Toast Styles ── */
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 2000;
    }
    .toast-message {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--sidebar-bg);
      border: 1px solid var(--border-color);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      min-width: 280px;
      max-width: 400px;
      color: var(--text-primary);
      cursor: pointer;
      animation: toastSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
      transition: all 0.2s;
    }
    .toast-message:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
    }
    .toast-message.success {
      border-left: 4px solid #22c55e;
    }
    .toast-message.danger {
      border-left: 4px solid #ef4444;
    }
    .toast-message.info {
      border-left: 4px solid var(--accent);
    }
    .toast-text {
      font-size: 0.85rem;
      font-weight: 500;
      flex: 1;
      line-height: 1.4;
    }
    .toast-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.1rem;
      cursor: pointer;
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @keyframes toastSlideIn {
      from { transform: translateX(120%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `],
})
export class App {
  private readonly resumeService = inject(ResumeService);
  private readonly exportService = inject(ExportService);
  readonly toastService = inject(ToastService);
  private readonly preview = viewChild(PreviewComponent);

  readonly showDashboard = signal(false);
  readonly editorWidth = signal(520);

  private isResizing = false;

  startResize(event: MouseEvent): void {
    event.preventDefault();
    this.isResizing = true;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!this.isResizing) return;
      const sidebarEl = document.querySelector('app-sidebar');
      const sidebarWidth = sidebarEl ? sidebarEl.getBoundingClientRect().width : 270;
      const newWidth = Math.max(320, Math.min(900, moveEvent.clientX - sidebarWidth));
      this.editorWidth.set(newWidth);
    };

    const onMouseUp = () => {
      this.isResizing = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
      event.preventDefault();
      this.resumeService.undo();
    }
    if ((event.metaKey || event.ctrlKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
      event.preventDefault();
      this.resumeService.redo();
    }
    if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
      event.preventDefault();
      this.exportPdf();
    }
  }

  async exportPdf(): Promise<void> {
    const previewComp = this.preview();
    if (!previewComp) return;

    // Neutralise the CSS zoom/scale transform before snapshotting so
    // html2canvas captures the full un-zoomed element at true dimensions
    const exportRef = previewComp.getPreviewElementForExport();
    if (!exportRef) return;

    const name = this.resumeService.resumeName() || 'resume';
    try {
      await this.exportService.exportToPdf(exportRef.element, `${name}.pdf`);
    } finally {
      // Always restore the zoom transform — even if export throws
      exportRef.restore();
    }
  }
}
