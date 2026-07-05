import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { SectionType } from '../../models/resume.model';

interface SectionOption {
  type: SectionType;
  label: string;
  icon: string;
  svgPath: string;
  description: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed()">
      <!-- Toggle Button -->
      <button class="sidebar-toggle" (click)="collapsed.set(!collapsed())" [title]="collapsed() ? 'Expand sidebar' : 'Collapse sidebar'">
        @if (collapsed()) {
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        } @else {
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        }
      </button>

      @if (collapsed()) {
        <!-- Collapsed: icon-only section buttons -->
        <div class="sidebar-icons">
          @for (option of sectionOptions; track option.type) {
            <button class="icon-only-btn" (click)="addSection(option.type)" [title]="option.label + ' — ' + option.description">
              <span class="icon-only-emoji">{{ option.icon }}</span>
            </button>
          }
        </div>
      } @else {
        <div class="sidebar-content">
          <!-- Completeness Score -->
          <div class="completeness-section">
            <div class="completeness-header">
              <span class="completeness-label">Resume Strength</span>
              <span class="completeness-value" [class]="scoreClass()">{{ resumeService.completenessScore() }}%</span>
            </div>
            <div class="completeness-bar">
              <div
                class="completeness-fill"
                [style.width.%]="resumeService.completenessScore()"
                [class]="scoreClass()"
              ></div>
            </div>
            <p class="completeness-hint">{{ scoreHint() }}</p>
          </div>

          <div class="sidebar-divider"></div>

          <!-- Section Palette -->
          <div class="sidebar-header">
            <h3>Add Sections</h3>
          </div>

          <div class="section-palette">
            @for (option of sectionOptions; track option.type) {
              <button class="section-card" (click)="addSection(option.type)">
                <span class="section-icon">{{ option.icon }}</span>
                <div class="section-info">
                  <span class="section-label">{{ option.label }}</span>
                  <span class="section-desc">{{ option.description }}</span>
                </div>
                <span class="add-icon">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                </span>
              </button>
            }
          </div>

          <div class="sidebar-divider"></div>

          <!-- Active Sections -->
          <div class="active-sections">
            <h4>
              Active Sections
              <span class="section-count">{{ resumeService.allSections().length }}</span>
            </h4>
            @for (section of resumeService.allSections(); track section.id) {
              <div class="active-section-item" [class.hidden-item]="!section.visible">
                <div class="active-section-left">
                  <div class="active-order">{{ section.order + 1 }}</div>
                  <span class="active-section-name">
                    {{ section.title }}
                  </span>
                </div>
                <div class="active-section-actions">
                  <button
                    class="action-btn"
                    (click)="resumeService.toggleSectionVisibility(section.id)"
                    [title]="section.visible ? 'Hide section' : 'Show section'"
                  >
                    @if (section.visible) {
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                      </svg>
                    } @else {
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                      </svg>
                    }
                  </button>
                  <button
                    class="action-btn danger"
                    (click)="resumeService.removeSection(section.id)"
                    title="Remove section"
                  >
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </div>
              </div>
            }

            @if (resumeService.allSections().length === 0) {
              <p class="no-sections-hint">Click sections above to add them</p>
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
      width: 270px;
      min-width: 270px;
      height: 100%;
      background: var(--sidebar-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    .sidebar.collapsed {
      width: 52px;
      min-width: 52px;
      overflow: hidden;
    }

    .sidebar-toggle {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      background: var(--section-header-bg);
      border: none;
      border-bottom: 1px solid var(--border-color);
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.2s;
      z-index: 10;
      flex-shrink: 0;
    }
    .sidebar-toggle:hover {
      background: var(--accent-glow);
      color: var(--accent);
    }

    /* Collapsed icon-only column */
    .sidebar-icons {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 0;
      gap: 4px;
    }
    .icon-only-btn {
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.18s;
      font-size: 1.1rem;
    }
    .icon-only-btn:hover {
      background: var(--accent-glow);
      transform: scale(1.1);
    }
    .icon-only-emoji {
      line-height: 1;
    }

    /* Full sidebar content */
    .sidebar-content {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* Completeness Section */
    .completeness-section {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 14px;
    }
    .completeness-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .completeness-label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .completeness-value {
      font-size: 0.78rem;
      font-weight: 700;
    }
    .completeness-value.low { color: #ef4444; }
    .completeness-value.medium { color: #f59e0b; }
    .completeness-value.high { color: #22c55e; }

    .completeness-bar {
      height: 6px;
      background: var(--border-color);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 6px;
    }
    .completeness-fill {
      height: 100%;
      border-radius: 10px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .completeness-fill.low { background: #ef4444; }
    .completeness-fill.medium { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .completeness-fill.high { background: linear-gradient(90deg, #22c55e, #4ade80); }

    .completeness-hint {
      font-size: 0.65rem;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.4;
    }

    /* Sidebar header */
    .sidebar-header h3 {
      font-size: 0.82rem;
      font-weight: 700;
      margin: 0 0 10px;
      color: var(--text-primary);
    }

    .sidebar-divider {
      height: 1px;
      background: var(--border-color);
      margin: 14px 0;
    }

    /* Section palette */
    .section-palette {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .section-card {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 8px 10px;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background: var(--card-bg);
      cursor: pointer;
      transition: all 0.18s;
      text-align: left;
      width: 100%;
      font-family: inherit;
    }
    .section-card:hover {
      border-color: var(--accent);
      transform: translateX(2px);
      box-shadow: 0 2px 8px var(--accent-glow);
    }

    .section-icon {
      font-size: 1rem;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-glow);
      border-radius: 7px;
      flex-shrink: 0;
    }

    .section-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .section-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .section-desc {
      font-size: 0.63rem;
      color: var(--text-muted);
      margin-top: 1px;
    }

    .add-icon {
      color: var(--text-muted);
      transition: color 0.18s, transform 0.18s;
      display: flex;
      align-items: center;
    }
    .section-card:hover .add-icon {
      color: var(--accent);
      transform: rotate(90deg);
    }

    /* Active sections */
    .active-sections h4 {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-count {
      font-size: 0.65rem;
      background: var(--accent);
      color: white;
      padding: 1px 6px;
      border-radius: 10px;
      font-weight: 700;
    }

    .active-section-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      border-radius: 8px;
      transition: background 0.15s;
      margin-bottom: 2px;
    }
    .active-section-item:hover { background: var(--card-bg); }
    .active-section-item.hidden-item { opacity: 0.5; }

    .active-section-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }
    .active-order {
      font-size: 0.6rem;
      font-weight: 700;
      color: var(--text-muted);
      background: var(--section-header-bg);
      width: 18px;
      height: 18px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .active-section-name {
      font-size: 0.76rem;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .active-section-actions {
      display: flex;
      gap: 3px;
      opacity: 0;
      transition: opacity 0.15s;
    }
    .active-section-item:hover .active-section-actions { opacity: 1; }

    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 5px;
      border-radius: 5px;
      transition: all 0.15s;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .action-btn:hover { background: var(--accent-glow); color: var(--accent); }
    .action-btn.danger:hover { background: #fee2e2; color: #ef4444; }

    .no-sections-hint {
      font-size: 0.7rem;
      color: var(--text-muted);
      text-align: center;
      padding: 12px 0;
      margin: 0;
    }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0;
        top: 58px;
        bottom: 0;
        z-index: 50;
        box-shadow: 4px 0 24px rgba(0,0,0,0.15);
      }
      .sidebar.collapsed { width: 52px; box-shadow: none; }
    }
  `],
})
export class SidebarComponent {
  readonly resumeService = inject(ResumeService);
  readonly collapsed = signal(false);

  readonly scoreClass = computed(() => {
    const score = this.resumeService.completenessScore();
    if (score < 40) return 'low';
    if (score < 75) return 'medium';
    return 'high';
  });

  readonly scoreHint = computed(() => {
    const score = this.resumeService.completenessScore();
    if (score < 20) return 'Fill in your name, contact, and a summary to get started.';
    if (score < 50) return 'Add work experience and skills to stand out.';
    if (score < 80) return 'Almost there! Add more details to your experience.';
    if (score < 100) return 'Looking great! A few more details and you\'re done.';
    return '✨ Excellent resume! You\'re ready to apply.';
  });

  readonly sectionOptions: SectionOption[] = [
    { type: 'header', label: 'Header', icon: '👤', svgPath: '', description: 'Name & job title' },
    { type: 'contact', label: 'Contact', icon: '📧', svgPath: '', description: 'Email, phone, links' },
    { type: 'summary', label: 'Summary', icon: '📝', svgPath: '', description: 'Professional summary' },
    { type: 'experience', label: 'Experience', icon: '💼', svgPath: '', description: 'Work history' },
    { type: 'education', label: 'Education', icon: '🎓', svgPath: '', description: 'Degrees & schools' },
    { type: 'skills', label: 'Skills', icon: '⚡', svgPath: '', description: 'Technical skills' },
    { type: 'projects', label: 'Projects', icon: '🚀', svgPath: '', description: 'Portfolio projects' },
    { type: 'custom', label: 'Custom', icon: '✏️', svgPath: '', description: 'Free-form section' },
  ];

  addSection(type: SectionType): void {
    this.resumeService.addSection(type);
  }
}
