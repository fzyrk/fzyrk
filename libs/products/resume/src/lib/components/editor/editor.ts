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

const SECTION_ICONS: Record<string, string> = {
  header: '👤',
  contact: '📧',
  summary: '📝',
  experience: '💼',
  education: '🎓',
  skills: '⚡',
  projects: '🚀',
  custom: '✏️',
};

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
        <div class="editor-header-left">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--accent)">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
          <h2>Editor</h2>
        </div>
        <p class="editor-hint">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" style="display:inline;vertical-align:middle;">
            <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-9 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
          Drag to reorder · Click ✎ to edit
        </p>
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
            [class.editing]="editingSection() === section.id"
          >
            <!-- Drag Placeholder -->
            <div class="drag-placeholder" cdkDragPlaceholder></div>

            <!-- Section Header -->
            <div class="section-header">
              <div class="section-header-left">
                <span class="drag-handle" cdkDragHandle title="Drag to reorder">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </span>
                <span class="section-type-badge">{{ sectionIcon(section.type) }}</span>
                <input
                  type="text"
                  class="section-title-input"
                  [value]="section.title"
                  (input)="onTitleChange(section.id, $event)"
                  (click)="$event.stopPropagation()"
                />
              </div>
              <div class="section-actions">
                <button
                  class="section-action-btn edit-btn"
                  (click)="toggleEdit(section.id)"
                  [class.active]="editingSection() === section.id"
                  [title]="editingSection() === section.id ? 'Close Editor' : 'Edit section'"
                >
                  @if (editingSection() === section.id) {
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0z"/>
                      <path d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0z"/>
                    </svg>
                  } @else {
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  }
                </button>
                <button
                  class="section-action-btn"
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
                  class="section-action-btn"
                  (click)="resumeService.duplicateSection(section.id)"
                  title="Duplicate section"
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
                  </svg>
                </button>
                <button
                  class="section-action-btn danger"
                  (click)="resumeService.removeSection(section.id)"
                  title="Delete section"
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Section Body — only shown when editing -->
            @if (editingSection() === section.id) {
              <div class="section-body" @fadeSlide>
                @switch (section.type) {
                  @case ('header') {
                    <app-header-section
                      [data]="$any(section.data)"
                      [editMode]="true"
                      (dataChange)="onDataChange(section.id, $event)"
                    />
                  }
                  @case ('summary') {
                    <app-summary-section
                      [data]="$any(section.data)"
                      [editMode]="true"
                      (dataChange)="onDataChange(section.id, $event)"
                    />
                  }
                  @case ('experience') {
                    <app-experience-section
                      [data]="$any(section.data)"
                      [editMode]="true"
                      (dataChange)="onDataChange(section.id, $event)"
                    />
                  }
                  @case ('education') {
                    <app-education-section
                      [data]="$any(section.data)"
                      [editMode]="true"
                      (dataChange)="onDataChange(section.id, $event)"
                    />
                  }
                  @case ('skills') {
                    <app-skills-section
                      [data]="$any(section.data)"
                      [editMode]="true"
                      (dataChange)="onDataChange(section.id, $event)"
                    />
                  }
                  @case ('projects') {
                    <app-projects-section
                      [data]="$any(section.data)"
                      [editMode]="true"
                      (dataChange)="onDataChange(section.id, $event)"
                    />
                  }
                  @case ('contact') {
                    <app-contact-section
                      [data]="$any(section.data)"
                      [editMode]="true"
                      (dataChange)="onDataChange(section.id, $event)"
                    />
                  }
                  @case ('custom') {
                    <app-custom-section
                      [data]="$any(section.data)"
                      [editMode]="true"
                      (dataChange)="onDataChange(section.id, $event)"
                    />
                  }
                }
              </div>
            }
          </div>
        }
      </div>

      @if (resumeService.allSections().length === 0) {
        <div class="empty-state">
          <div class="empty-illustration">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </div>
          <h3>Your resume is empty</h3>
          <p>Add sections from the left sidebar to start building your resume</p>
          <div class="empty-arrow">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="var(--accent)">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
            Add sections from the sidebar
          </div>
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
      padding: 18px 16px;
      overflow-y: auto;
      height: 100%;
    }

    .editor-header {
      margin-bottom: 16px;
    }
    .editor-header-left {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .editor-header h2 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }
    .editor-hint {
      font-size: 0.68rem;
      color: var(--text-muted);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .sections-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .section-wrapper {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      transition: all 0.2s;
      overflow: hidden;
    }
    .section-wrapper:hover {
      border-color: rgba(99, 102, 241, 0.3);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }
    .section-wrapper.editing {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent-glow);
    }
    .section-wrapper.hidden-section {
      opacity: 0.4;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      background: var(--section-header-bg);
      cursor: default;
    }

    .section-header-left {
      display: flex;
      align-items: center;
      gap: 7px;
      flex: 1;
      min-width: 0;
    }

    .drag-handle {
      cursor: grab;
      color: var(--text-muted);
      user-select: none;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.15s;
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
    .drag-handle:hover { color: var(--accent); }
    .drag-handle:active { cursor: grabbing; }

    .section-type-badge {
      font-size: 0.9rem;
      flex-shrink: 0;
    }

    .section-title-input {
      background: transparent;
      border: 1px solid transparent;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-primary);
      padding: 3px 6px;
      border-radius: 5px;
      flex: 1;
      font-family: inherit;
      transition: all 0.2s;
      min-width: 0;
    }
    .section-title-input:hover { border-color: var(--border-color); }
    .section-title-input:focus {
      outline: none;
      border-color: var(--accent);
      background: var(--input-bg);
    }

    .section-actions {
      display: flex;
      gap: 3px;
      flex-shrink: 0;
    }

    .section-action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px 6px;
      border-radius: 6px;
      color: var(--text-muted);
      transition: all 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .section-action-btn:hover {
      background: var(--accent-glow);
      color: var(--accent);
    }
    .section-action-btn.edit-btn.active {
      background: var(--accent);
      color: white;
    }
    .section-action-btn.danger:hover {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .section-body {
      padding: 14px;
      border-top: 1px solid var(--border-color);
      animation: fadeSlideIn 0.2s ease;
    }

    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .drag-placeholder {
      background: var(--accent-glow);
      border: 2px dashed var(--accent);
      border-radius: 12px;
      min-height: 52px;
      transition: all 0.3s;
    }

    :host ::ng-deep .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    :host ::ng-deep .cdk-drag-preview {
      border-radius: 12px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
      opacity: 0.92;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 60px 20px 40px;
      color: var(--text-muted);
      animation: fadeIn 0.4s ease;
    }
    .empty-illustration {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      border-radius: 20px;
      background: var(--accent-glow);
      margin-bottom: 16px;
    }
    .empty-state h3 {
      font-size: 1rem;
      margin: 0 0 8px;
      color: var(--text-primary);
      font-weight: 600;
    }
    .empty-state p {
      font-size: 0.8rem;
      margin: 0 0 20px;
      line-height: 1.5;
    }
    .empty-arrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      color: var(--accent);
      font-weight: 500;
      padding: 8px 16px;
      background: var(--accent-glow);
      border-radius: 20px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
})
export class EditorComponent {
  readonly resumeService = inject(ResumeService);
  readonly editingSection = signal<string | null>(null);

  sectionIcon(type: string): string {
    return SECTION_ICONS[type] ?? '📄';
  }

  onDrop(event: CdkDragDrop<ResumeSection[]>): void {
    // Reset edit state on reorder to avoid stale reference
    this.editingSection.set(null);
    this.resumeService.reorderSections(event.previousIndex, event.currentIndex);
  }

  toggleEdit(sectionId: string): void {
    this.editingSection.set(
      this.editingSection() === sectionId ? null : sectionId
    );
  }

  onTitleChange(sectionId: string, event: Event): void {
    // Fixed: use 'input' event (fires on every keystroke, not just blur)
    const value = (event.target as HTMLInputElement).value;
    this.resumeService.updateSection(sectionId, { title: value });
  }

  onDataChange(sectionId: string, data: SectionData): void {
    this.resumeService.updateSectionData(sectionId, data);
  }
}
