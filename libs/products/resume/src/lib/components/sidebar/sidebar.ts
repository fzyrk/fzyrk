import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { SectionType } from '../../models/resume.model';

interface SectionOption {
  type: SectionType;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed()">
      <button class="sidebar-toggle" (click)="collapsed.set(!collapsed())">
        {{ collapsed() ? '☰' : '✕' }}
      </button>

      @if (!collapsed()) {
        <div class="sidebar-content">
          <div class="sidebar-header">
            <h3>Sections</h3>
            <p class="sidebar-subtitle">Click to add a section to your resume</p>
          </div>

          <div class="section-palette">
            @for (option of sectionOptions; track option.type) {
              <button class="section-card" (click)="addSection(option.type)">
                <span class="section-icon">{{ option.icon }}</span>
                <div class="section-info">
                  <span class="section-label">{{ option.label }}</span>
                  <span class="section-desc">{{ option.description }}</span>
                </div>
                <span class="add-icon">+</span>
              </button>
            }
          </div>

          <div class="sidebar-divider"></div>

          <div class="active-sections">
            <h4>Active Sections</h4>
            @for (section of resumeService.allSections(); track section.id) {
              <div class="active-section-item">
                <span class="active-section-name" [class.hidden-section]="!section.visible">
                  {{ section.title }}
                </span>
                <div class="active-section-actions">
                  <button
                    class="action-btn"
                    (click)="resumeService.toggleSectionVisibility(section.id)"
                    [title]="section.visible ? 'Hide' : 'Show'"
                  >
                    {{ section.visible ? '👁' : '👁‍🗨' }}
                  </button>
                  <button
                    class="action-btn danger"
                    (click)="resumeService.removeSection(section.id)"
                    title="Remove"
                  >
                    🗑
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </aside>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .sidebar {
      width: 280px;
      min-width: 280px;
      height: 100%;
      background: var(--sidebar-bg);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    .sidebar.collapsed {
      width: 48px;
      min-width: 48px;
    }

    .sidebar-toggle {
      position: absolute;
      top: 12px;
      right: 12px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.9rem;
      color: var(--text-muted);
      transition: all 0.2s;
      z-index: 10;
    }
    .collapsed .sidebar-toggle {
      right: 8px;
      top: 8px;
    }
    .sidebar-toggle:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    .sidebar-content {
      padding: 16px;
      padding-top: 52px;
    }

    .sidebar-header h3 {
      font-size: 0.95rem;
      font-weight: 700;
      margin: 0 0 4px;
      color: var(--text-primary);
    }
    .sidebar-subtitle {
      font-size: 0.72rem;
      color: var(--text-muted);
      margin: 0 0 16px;
    }

    .section-palette {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .section-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background: var(--card-bg);
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      width: 100%;
      font-family: inherit;
    }
    .section-card:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px var(--accent-glow);
    }

    .section-icon {
      font-size: 1.2rem;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-glow);
      border-radius: 8px;
      flex-shrink: 0;
    }

    .section-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .section-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .section-desc {
      font-size: 0.65rem;
      color: var(--text-muted);
    }

    .add-icon {
      font-size: 1.1rem;
      color: var(--text-muted);
      font-weight: 700;
      transition: color 0.2s;
    }
    .section-card:hover .add-icon { color: var(--accent); }

    .sidebar-divider {
      height: 1px;
      background: var(--border-color);
      margin: 20px 0;
    }

    .active-sections h4 {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 10px;
    }

    .active-section-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 10px;
      border-radius: 8px;
      transition: background 0.15s;
      margin-bottom: 2px;
    }
    .active-section-item:hover { background: var(--card-bg); }

    .active-section-name {
      font-size: 0.78rem;
      color: var(--text-primary);
    }
    .active-section-name.hidden-section {
      color: var(--text-muted);
      text-decoration: line-through;
      opacity: 0.6;
    }

    .active-section-actions {
      display: flex;
      gap: 4px;
    }
    .action-btn {
      background: none;
      border: none;
      font-size: 0.72rem;
      cursor: pointer;
      padding: 3px 5px;
      border-radius: 4px;
      transition: all 0.15s;
      opacity: 0.5;
    }
    .active-section-item:hover .action-btn { opacity: 1; }
    .action-btn:hover { background: var(--accent-glow); }
    .action-btn.danger:hover { background: #fee2e2; }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0;
        top: 60px;
        bottom: 0;
        z-index: 50;
        box-shadow: 4px 0 24px rgba(0,0,0,0.15);
      }
      .sidebar.collapsed { width: 48px; box-shadow: none; }
    }
  `],
})
export class SidebarComponent {
  readonly resumeService = inject(ResumeService);
  readonly collapsed = signal(false);

  readonly sectionOptions: SectionOption[] = [
    { type: 'header', label: 'Header', icon: '👤', description: 'Name & job title' },
    { type: 'contact', label: 'Contact', icon: '📧', description: 'Email, phone, links' },
    { type: 'summary', label: 'Summary', icon: '📝', description: 'Professional summary' },
    { type: 'experience', label: 'Experience', icon: '💼', description: 'Work history' },
    { type: 'education', label: 'Education', icon: '🎓', description: 'Degrees & schools' },
    { type: 'skills', label: 'Skills', icon: '⚡', description: 'Technical skills' },
    { type: 'projects', label: 'Projects', icon: '🚀', description: 'Portfolio projects' },
    { type: 'custom', label: 'Custom', icon: '✏️', description: 'Free-form section' },
  ];

  addSection(type: SectionType): void {
    this.resumeService.addSection(type);
  }
}
