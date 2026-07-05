import { Component, inject, signal, computed, output, OnInit, ChangeDetectionStrategy, DOCUMENT } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersistenceService } from '../../services/persistence.service';
import { ResumeService } from '../../services/resume.service';
import { ExportService } from '../../services/export.service';
import { ToastService } from '../../services/toast.service';
import { generateId, DEFAULT_RESUME, ResumeData } from '../../models/resume.model';
import { FzConfirmModalComponent } from '@fzyrk/ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, FzConfirmModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-overlay" (click)="close.emit()">
      <div class="dashboard-modal" (click)="$event.stopPropagation()">

        <!-- Header -->
        <div class="modal-header">
          <div class="modal-title">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="var(--accent)">
              <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2L9.5 1.5z"/>
            </svg>
            <h2>My Resumes</h2>
          </div>
          <div class="modal-actions">
            <button class="header-action-btn" (click)="triggerImport()" title="Import from JSON backup">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
              </svg>
              Import
            </button>
            <button class="header-action-btn" (click)="exportBackup()" title="Export all resumes as JSON" [disabled]="resumes().length === 0">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Backup
            </button>
            <button class="close-btn" (click)="close.emit()">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <input type="file" #fileInput accept=".json" (change)="onFileImport($event)" style="display:none">

          <div class="resume-grid">
            <!-- New Resume Card -->
            <button class="resume-card new-card" (click)="createNew()">
              <div class="new-icon">
                <svg width="28" height="28" viewBox="0 0 16 16" fill="var(--accent)">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </div>
              <span class="new-label">New Resume</span>
            </button>

            <!-- Existing Resumes -->
            @for (resume of resumes(); track resume.id) {
              <div
                class="resume-card"
                [class.active]="resume.id === currentId()"
                (click)="loadResume(resume.id)"
              >
                <!-- Template color indicator -->
                <div class="card-template-bar" [style.background]="resume.accentColor || '#6366f1'"></div>

                <div class="card-content">
                  <div class="card-icon-row">
                    <div class="card-icon">
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="var(--text-muted)">
                        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2L9.5 1.5z"/>
                      </svg>
                    </div>
                    @if (resume.id === currentId()) {
                      <span class="active-badge">Active</span>
                    }
                  </div>
                  <h3 class="card-name">{{ resume.name }}</h3>
                  <span class="card-date">{{ formatRelativeDate(resume.updatedAt) }}</span>
                  <div class="card-meta">
                    <span class="card-template">{{ resume.templateId }}</span>
                    <span class="card-dot">·</span>
                    <span class="card-sections">{{ resume.sections?.length || 0 }} sections</span>
                  </div>
                </div>

                <div class="card-actions">
                  <button
                    class="card-action-btn"
                    (click)="duplicateResume(resume); $event.stopPropagation()"
                    title="Duplicate resume"
                  >
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
                    </svg>
                    Duplicate
                  </button>
                  <button
                    class="card-action-btn danger"
                    (click)="deleteResume(resume.id); $event.stopPropagation()"
                    title="Delete resume"
                  >
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            }
          </div>

          @if (resumes().length === 0) {
            <div class="empty-state">
              <div class="empty-icon">
                <svg width="40" height="40" viewBox="0 0 16 16" fill="var(--text-muted)">
                  <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2L9.5 1.5z"/>
                </svg>
              </div>
              <h3>No resumes yet</h3>
              <p>Create your first resume to get started.</p>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    @if (pendingDeleteId()) {
      <fz-confirm-modal
        title="Delete Resume?"
        message="Are you sure you want to delete this resume? This cannot be undone."
        variant="danger"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        (confirm)="confirmDelete()"
        (cancel)="pendingDeleteId.set(null)"
      />
    }
  `,
  styles: [`
    .dashboard-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: overlayIn 0.2s ease;
    }

    .dashboard-modal {
      background: var(--sidebar-bg);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      width: 92%;
      max-width: 720px;
      max-height: 82vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5);
      animation: modalIn 0.28s cubic-bezier(0.34, 1.4, 0.64, 1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px 16px;
      border-bottom: 1px solid var(--border-color);
      flex-shrink: 0;
    }
    .modal-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .modal-title h2 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }

    .modal-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .header-action-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 5px 10px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid var(--border-color);
      border-radius: 7px;
      background: var(--input-bg);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
    }
    .header-action-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }
    .header-action-btn:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
    .close-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      transition: all 0.15s;
    }
    .close-btn:hover { background: var(--card-bg); color: var(--text-primary); }

    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
    }

    .resume-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));
      gap: 12px;
    }

    .resume-card {
      background: var(--card-bg);
      border: 1.5px solid var(--border-color);
      border-radius: 14px;
      padding: 0;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: cardIn 0.35s cubic-bezier(0.34, 1.4, 0.64, 1) both;
      text-align: left;
      font-family: inherit;
    }
    .resume-card:nth-child(1) { animation-delay: 0.04s; }
    .resume-card:nth-child(2) { animation-delay: 0.08s; }
    .resume-card:nth-child(3) { animation-delay: 0.12s; }
    .resume-card:nth-child(4) { animation-delay: 0.16s; }
    .resume-card:nth-child(5) { animation-delay: 0.20s; }
    .resume-card:nth-child(6) { animation-delay: 0.24s; }
    .resume-card:hover {
      border-color: var(--accent);
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(0,0,0,0.15), 0 0 0 1px var(--accent);
    }
    .resume-card.active {
      border-color: var(--accent);
    }

    .card-template-bar {
      height: 4px;
      width: 100%;
      flex-shrink: 0;
    }

    .card-content {
      padding: 14px 16px 10px;
      flex: 1;
    }
    .card-icon-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .card-icon {
      opacity: 0.5;
      display: flex;
    }
    .card-name {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-date {
      font-size: 0.68rem;
      color: var(--text-muted);
      display: block;
      margin-bottom: 6px;
    }
    .card-meta {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .card-template {
      font-size: 0.63rem;
      color: var(--accent);
      text-transform: capitalize;
      font-weight: 600;
    }
    .card-dot { font-size: 0.6rem; color: var(--text-muted); }
    .card-sections {
      font-size: 0.63rem;
      color: var(--text-muted);
    }

    .active-badge {
      font-size: 0.58rem;
      background: var(--accent);
      color: white;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .card-actions {
      display: flex;
      gap: 6px;
      padding: 10px 16px 12px;
      border-top: 1px solid var(--border-color);
      opacity: 0;
      transition: opacity 0.15s;
    }
    .resume-card:hover .card-actions { opacity: 1; }

    .card-action-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--section-header-bg);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.68rem;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.15s;
      font-family: inherit;
    }
    .card-action-btn:hover { border-color: var(--accent); color: var(--accent); }
    .card-action-btn.danger:hover { border-color: #ef4444; color: #ef4444; }

    /* New card */
    .new-card {
      border-style: dashed;
      align-items: center;
      justify-content: center;
      min-height: 148px;
      gap: 10px;
      color: var(--text-muted);
    }
    .new-card:hover {
      color: var(--accent);
      border-color: var(--accent);
      background: var(--accent-glow);
    }
    .new-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: var(--accent-glow);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .new-card:hover .new-icon { background: var(--accent); }
    .new-card:hover .new-icon svg { fill: white; }
    .new-label {
      font-size: 0.82rem;
      font-weight: 600;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 48px;
      color: var(--text-muted);
    }
    .empty-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 72px;
      height: 72px;
      border-radius: 18px;
      background: var(--card-bg);
      margin-bottom: 16px;
    }
    .empty-state h3 { font-size: 1rem; color: var(--text-primary); margin: 0 0 6px; }
    .empty-state p { font-size: 0.82rem; margin: 0; }

    @keyframes overlayIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.94) translateY(12px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
  `],
})
export class DashboardComponent implements OnInit {
  private readonly persistence = inject(PersistenceService);
  private readonly resumeService = inject(ResumeService);
  private readonly exportService = inject(ExportService);
  private readonly toastService = inject(ToastService);
  private readonly document = inject(DOCUMENT);

  readonly close = output<void>();

  readonly resumes = signal<ResumeData[]>([]);
  readonly currentId = computed(() => this.resumeService.resume().id);
  readonly pendingDeleteId = signal<string | null>(null);

  ngOnInit(): void {
    // Fix: always refresh on open, not just in constructor
    this.refreshResumes();
  }

  private refreshResumes(): void {
    const index = this.persistence.getIndex();
    const loaded: ResumeData[] = [];
    for (const entry of index) {
      const data = this.persistence.load(entry.id);
      if (data) loaded.push(data);
    }
    // Sort by most recently updated
    loaded.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    this.resumes.set(loaded);
  }

  createNew(): void {
    const fresh: ResumeData = {
      ...JSON.parse(JSON.stringify(DEFAULT_RESUME)),
      id: generateId(),
      name: 'Untitled Resume',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.persistence.save(fresh);
    this.resumeService.loadResume(fresh);
    this.refreshResumes();
    this.close.emit();
    this.toastService.show('New resume created!', 'success');
  }

  loadResume(id: string): void {
    const data = this.persistence.load(id);
    if (data) {
      this.resumeService.loadResume(data);
      this.close.emit();
    }
  }

  deleteResume(id: string): void {
    this.pendingDeleteId.set(id);
  }

  confirmDelete(): void {
    const id = this.pendingDeleteId();
    if (id) {
      this.persistence.delete(id);
      this.refreshResumes();
      this.toastService.show('Resume deleted.', 'info');
      this.pendingDeleteId.set(null);
    }
  }

  duplicateResume(resume: ResumeData): void {
    const copy: ResumeData = {
      ...JSON.parse(JSON.stringify(resume)),
      id: generateId(),
      name: resume.name + ' (Copy)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.persistence.save(copy);
    this.refreshResumes();
    this.toastService.show('Resume duplicated!', 'success');
  }

  exportBackup(): void {
    const allResumes = this.resumes();
    this.exportService.exportAsJson({ resumes: allResumes, exportedAt: new Date().toISOString() }, 'resumes-backup.json');
  }

  triggerImport(): void {
    const input = this.document.querySelector('input[type=file]') as HTMLInputElement;
    input?.click();
  }

  onFileImport(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        // Support both single resume and backup format
        const resumesToImport: ResumeData[] = parsed.resumes ?? [parsed];
        let count = 0;
        for (const resume of resumesToImport) {
          if (resume.id && resume.sections && resume.name) {
            // Give it a new ID to avoid collision
            const imported = { ...resume, id: generateId(), name: resume.name + ' (Imported)' };
            this.persistence.save(imported);
            count++;
          }
        }
        this.refreshResumes();
        this.toastService.show(`Imported ${count} resume${count !== 1 ? 's' : ''} successfully!`, 'success');
      } catch {
        this.toastService.show('Failed to import — invalid file format.', 'danger');
      }
    };
    reader.readAsText(file);
    // Reset file input
    (event.target as HTMLInputElement).value = '';
  }

  formatRelativeDate(dateStr: string): string {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '';
    }
  }
}
