import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDragHandle, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { ResumeService } from '../../services/resume.service';
import { ResumeSection, SectionData } from '../../models/resume.model';

import { HeaderSectionComponent } from '../sections/header-section/header-section';
import { SummarySectionComponent } from '../sections/summary-section/summary-section';
import { ExperienceSectionComponent } from '../sections/experience-section/experience-section';
import { EducationSectionComponent } from '../sections/education-section/education-section';
import { SkillsSectionComponent } from '../sections/skills-section/skills-section';
import { ProjectsSectionComponent } from '../sections/projects-section/projects-section';
import { ContactSectionComponent } from '../sections/contact-section/contact-section';
import { CustomSectionComponent } from '../sections/custom-section/custom-section';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CdkDropList, CdkDrag, CdkDragHandle, CdkDragPlaceholder,
    HeaderSectionComponent, SummarySectionComponent,
    ExperienceSectionComponent, EducationSectionComponent,
    SkillsSectionComponent, ProjectsSectionComponent,
    ContactSectionComponent, CustomSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="editor-container">
      <div class="editor-header">
        <h2>✎ Editor</h2>
        <p class="editor-hint">Drag sections to reorder • Click to edit</p>
      </div>

      <div
        class="sections-list"
        cdkDropList
        (cdkDropListDropped)="onDrop($event)"
      >
        @for (section of resumeService.allSections(); track section.id) {
          <div
            class="section-wrapper"
            cdkDrag
            [class.hidden-section]="!section.visible"
          >
            <!-- Drag Preview -->
            <div class="drag-placeholder" cdkDragPlaceholder></div>

            <!-- Section Header -->
            <div class="section-header">
              <div class="section-header-left">
                <span class="drag-handle" cdkDragHandle title="Drag to reorder">⠿</span>
                <input
                  type="text"
                  class="section-title-input"
                  [value]="section.title"
                  (change)="onTitleChange(section.id, $event)"
                />
              </div>
              <div class="section-actions">
                <button
                  class="section-action-btn"
                  (click)="toggleEdit(section.id)"
                  [title]="editingSection() === section.id ? 'Close Editor' : 'Edit'"
                >
                  {{ editingSection() === section.id ? '✓' : '✎' }}
                </button>
                <button
                  class="section-action-btn"
                  (click)="resumeService.toggleSectionVisibility(section.id)"
                  [title]="section.visible ? 'Hide' : 'Show'"
                >
                  {{ section.visible ? '👁' : '👁‍🗨' }}
                </button>
                <button
                  class="section-action-btn"
                  (click)="resumeService.duplicateSection(section.id)"
                  title="Duplicate"
                >
                  ⧉
                </button>
                <button
                  class="section-action-btn danger"
                  (click)="resumeService.removeSection(section.id)"
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>

            <!-- Section Body -->
            <div class="section-body">
              @switch (section.type) {
                @case ('header') {
                  <app-header-section
                    [data]="$any(section.data)"
                    [editMode]="editingSection() === section.id"
                    (dataChange)="onDataChange(section.id, $event)"
                  />
                }
                @case ('summary') {
                  <app-summary-section
                    [data]="$any(section.data)"
                    [editMode]="editingSection() === section.id"
                    (dataChange)="onDataChange(section.id, $event)"
                  />
                }
                @case ('experience') {
                  <app-experience-section
                    [data]="$any(section.data)"
                    [editMode]="editingSection() === section.id"
                    (dataChange)="onDataChange(section.id, $event)"
                  />
                }
                @case ('education') {
                  <app-education-section
                    [data]="$any(section.data)"
                    [editMode]="editingSection() === section.id"
                    (dataChange)="onDataChange(section.id, $event)"
                  />
                }
                @case ('skills') {
                  <app-skills-section
                    [data]="$any(section.data)"
                    [editMode]="editingSection() === section.id"
                    (dataChange)="onDataChange(section.id, $event)"
                  />
                }
                @case ('projects') {
                  <app-projects-section
                    [data]="$any(section.data)"
                    [editMode]="editingSection() === section.id"
                    (dataChange)="onDataChange(section.id, $event)"
                  />
                }
                @case ('contact') {
                  <app-contact-section
                    [data]="$any(section.data)"
                    [editMode]="editingSection() === section.id"
                    (dataChange)="onDataChange(section.id, $event)"
                  />
                }
                @case ('custom') {
                  <app-custom-section
                    [data]="$any(section.data)"
                    [editMode]="editingSection() === section.id"
                    (dataChange)="onDataChange(section.id, $event)"
                  />
                }
              }
            </div>
          </div>
        }
      </div>

      @if (resumeService.allSections().length === 0) {
        <div class="empty-state">
          <span class="empty-icon">📋</span>
          <h3>No sections yet</h3>
          <p>Add sections from the sidebar to build your resume</p>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      flex: 1;
      height: 100%;
      overflow: hidden;
    }

    .editor-container {
      padding: 20px;
      overflow-y: auto;
      height: 100%;
    }

    .editor-header {
      margin-bottom: 20px;
    }
    .editor-header h2 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 4px;
    }
    .editor-hint {
      font-size: 0.72rem;
      color: var(--text-muted);
      margin: 0;
    }

    .sections-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .section-wrapper {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      transition: all 0.2s;
      overflow: hidden;
    }
    .section-wrapper:hover {
      border-color: var(--accent);
      box-shadow: 0 2px 12px var(--accent-glow);
    }
    .section-wrapper.hidden-section {
      opacity: 0.45;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: var(--section-header-bg);
      border-bottom: 1px solid var(--border-color);
    }

    .section-header-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }

    .drag-handle {
      cursor: grab;
      font-size: 1.1rem;
      color: var(--text-muted);
      user-select: none;
      padding: 2px;
      border-radius: 4px;
      transition: color 0.15s;
      letter-spacing: 2px;
    }
    .drag-handle:hover { color: var(--accent); }
    .drag-handle:active { cursor: grabbing; }

    .section-title-input {
      background: transparent;
      border: 1px solid transparent;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-primary);
      padding: 3px 8px;
      border-radius: 6px;
      flex: 1;
      font-family: inherit;
      transition: all 0.2s;
    }
    .section-title-input:hover { border-color: var(--border-color); }
    .section-title-input:focus {
      outline: none;
      border-color: var(--accent);
      background: var(--input-bg);
    }

    .section-actions {
      display: flex;
      gap: 4px;
    }

    .section-action-btn {
      background: none;
      border: none;
      font-size: 0.78rem;
      cursor: pointer;
      padding: 4px 7px;
      border-radius: 6px;
      color: var(--text-muted);
      transition: all 0.15s;
    }
    .section-action-btn:hover {
      background: var(--accent-glow);
      color: var(--accent);
    }
    .section-action-btn.danger:hover {
      background: #fee2e2;
      color: #ef4444;
    }

    .section-body {
      padding: 16px;
    }

    .drag-placeholder {
      background: var(--accent-glow);
      border: 2px dashed var(--accent);
      border-radius: 14px;
      min-height: 60px;
      transition: all 0.3s;
    }

    :host ::ng-deep .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    :host ::ng-deep .cdk-drag-preview {
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
      opacity: 0.9;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-muted);
    }
    .empty-icon { font-size: 3rem; display: block; margin-bottom: 12px; }
    .empty-state h3 { font-size: 1rem; margin: 0 0 6px; color: var(--text-primary); }
    .empty-state p { font-size: 0.82rem; margin: 0; }
  `],
})
export class EditorComponent {
  readonly resumeService = inject(ResumeService);
  readonly editingSection = signal<string | null>(null);

  onDrop(event: CdkDragDrop<ResumeSection[]>): void {
    this.resumeService.reorderSections(event.previousIndex, event.currentIndex);
  }

  toggleEdit(sectionId: string): void {
    this.editingSection.set(
      this.editingSection() === sectionId ? null : sectionId
    );
  }

  onTitleChange(sectionId: string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.resumeService.updateSection(sectionId, { title: value });
  }

  onDataChange(sectionId: string, data: SectionData): void {
    this.resumeService.updateSectionData(sectionId, data);
  }
}
