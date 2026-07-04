import { Component, inject, viewChild, signal, HostListener, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { SidebarComponent } from './components/sidebar/sidebar';
import { EditorComponent } from './components/editor/editor';
import { PreviewComponent } from './components/preview/preview';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ResumeService } from './services/resume.service';
import { ExportService } from './services/export.service';

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
  `],
})
export class App {
  private readonly resumeService = inject(ResumeService);
  private readonly exportService = inject(ExportService);
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
