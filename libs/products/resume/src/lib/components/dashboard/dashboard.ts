import { Component, inject, signal, computed, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersistenceService } from '../../services/persistence.service';
import { ResumeService } from '../../services/resume.service';
import { generateId, DEFAULT_RESUME, ResumeData } from '../../models/resume.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-overlay" (click)="close.emit()">
      <div class="dashboard-modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>📂 My Resumes</h2>
          <button class="close-btn" (click)="close.emit()">×</button>
        </div>

        <div class="modal-body">
          <div class="resume-grid">
            <!-- New Resume Card -->
            <button class="resume-card new-card" (click)="createNew()">
              <span class="new-icon">+</span>
              <span class="new-label">New Resume</span>
            </button>

            <!-- Existing Resumes -->
            @for (resume of resumes(); track resume.id) {
              <div
                class="resume-card"
                [class.active]="resume.id === currentId()"
                (click)="loadResume(resume.id)"
              >
                <div class="card-content">
                  <div class="card-icon">📄</div>
                  <h3 class="card-name">{{ resume.name }}</h3>
                  <span class="card-date">{{ formatDate(resume.updatedAt) }}</span>
                  <span class="card-template">{{ resume.templateId }}</span>
                </div>
                <div class="card-actions">
                  <button
                    class="card-action-btn"
                    (click)="duplicateResume(resume); $event.stopPropagation()"
                    title="Duplicate"
                  >
                    ⧉
                  </button>
                  <button
                    class="card-action-btn danger"
                    (click)="deleteResume(resume.id); $event.stopPropagation()"
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
                @if (resume.id === currentId()) {
                  <span class="active-badge">Active</span>
                }
              </div>
            }
          </div>

          @if (resumes().length === 0) {
            <div class="empty-state">
              <span class="empty-icon">📋</span>
              <p>No saved resumes yet. Create your first one!</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }

    .dashboard-modal {
      background: var(--sidebar-bg);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      width: 90%;
      max-width: 700px;
      max-height: 80vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
      animation: scaleIn 0.25s ease;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 28px 16px;
      border-bottom: 1px solid var(--border-color);
    }
    .modal-header h2 {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 8px;
      transition: all 0.15s;
    }
    .close-btn:hover { background: var(--card-bg); color: var(--text-primary); }

    .modal-body {
      padding: 24px 28px;
      overflow-y: auto;
    }

    .resume-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 14px;
    }

    .resume-card {
      background: var(--card-bg);
      border: 2px solid var(--border-color);
      border-radius: 14px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .resume-card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px var(--accent-glow);
    }
    .resume-card.active {
      border-color: var(--accent);
      background: var(--accent-glow);
    }

    .new-card {
      border-style: dashed;
      align-items: center;
      justify-content: center;
      min-height: 140px;
      font-family: inherit;
      color: var(--text-muted);
    }
    .new-card:hover {
      color: var(--accent);
      border-color: var(--accent);
    }
    .new-icon {
      font-size: 2rem;
      font-weight: 300;
      line-height: 1;
    }
    .new-label {
      font-size: 0.85rem;
      font-weight: 600;
      margin-top: 6px;
    }

    .card-content { flex: 1; }
    .card-icon { font-size: 1.6rem; margin-bottom: 8px; }
    .card-name {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-date {
      font-size: 0.68rem;
      color: var(--text-muted);
      display: block;
      margin-bottom: 4px;
    }
    .card-template {
      font-size: 0.65rem;
      color: var(--accent);
      text-transform: capitalize;
      font-weight: 600;
    }

    .card-actions {
      display: flex;
      gap: 6px;
      margin-top: 12px;
      opacity: 0;
      transition: opacity 0.15s;
    }
    .resume-card:hover .card-actions { opacity: 1; }

    .card-action-btn {
      background: var(--section-header-bg);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.72rem;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.15s;
    }
    .card-action-btn:hover { border-color: var(--accent); color: var(--accent); }
    .card-action-btn.danger:hover { border-color: #ef4444; color: #ef4444; }

    .active-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: var(--accent);
      color: white;
      font-size: 0.6rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: var(--text-muted);
    }
    .empty-icon { font-size: 2.5rem; display: block; margin-bottom: 10px; }
    .empty-state p { font-size: 0.85rem; margin: 0; }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `],
})
export class DashboardComponent {
  private readonly persistence = inject(PersistenceService);
  private readonly resumeService = inject(ResumeService);

  readonly close = output<void>();

  readonly resumes = signal<ResumeData[]>([]);
  readonly currentId = computed(() => this.resumeService.resume().id);

  constructor() {
    this.refreshResumes();
  }

  private refreshResumes(): void {
    const index = this.persistence.getIndex();
    const loaded: ResumeData[] = [];
    for (const entry of index) {
      const data = this.persistence.load(entry.id);
      if (data) loaded.push(data);
    }
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
  }

  loadResume(id: string): void {
    const data = this.persistence.load(id);
    if (data) {
      this.resumeService.loadResume(data);
      this.close.emit();
    }
  }

  deleteResume(id: string): void {
    if (!confirm('Delete this resume? This cannot be undone.')) return;
    this.persistence.delete(id);
    this.refreshResumes();
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
  }

  formatDate(dateStr: string): string {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  }
}
