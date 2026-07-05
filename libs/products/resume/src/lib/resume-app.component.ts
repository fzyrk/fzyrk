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
      <div class="app-body">
        <app-sidebar />
        <app-editor />
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
            @if (toast.type === 'success') { ✅ }
            @else if (toast.type === 'danger') { ⚠️ }
            @else { ℹ️ }
          </span>
          <span class="toast-text">{{ toast.message }}</span>
          <button class="toast-close">×</button>
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

    @media (max-width: 768px) {
      .app-body {
        flex-direction: column;
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

    const element = previewComp.getPreviewElement();
    if (!element) return;

    const name = this.resumeService.resumeName() || 'resume';
    await this.exportService.exportToPdf(element, `${name}.pdf`);
  }
}
