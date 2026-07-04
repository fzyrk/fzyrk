import { Component, inject, ElementRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { TemplateService } from '../../services/template.service';

import { HeaderSectionComponent } from '../sections/header-section/header-section';
import { SummarySectionComponent } from '../sections/summary-section/summary-section';
import { ExperienceSectionComponent } from '../sections/experience-section/experience-section';
import { EducationSectionComponent } from '../sections/education-section/education-section';
import { SkillsSectionComponent } from '../sections/skills-section/skills-section';
import { ProjectsSectionComponent } from '../sections/projects-section/projects-section';
import { ContactSectionComponent } from '../sections/contact-section/contact-section';
import { CustomSectionComponent } from '../sections/custom-section/custom-section';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    HeaderSectionComponent, SummarySectionComponent,
    ExperienceSectionComponent, EducationSectionComponent,
    SkillsSectionComponent, ProjectsSectionComponent,
    ContactSectionComponent, CustomSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="preview-container">
      <div class="preview-header">
        <h2>👁 Live Preview</h2>
      </div>
      <div class="preview-scroll-area">
        <div
          #resumePreview
          class="resume-page"
          [class]="templateClass()"
          [style.font-family]="resumeService.fontFamily()"
          [style.--accent]="resumeService.accentColor()"
        >
          @for (section of resumeService.sections(); track section.id) {
            <div class="preview-section" [attr.data-section-type]="section.type">
              @if (section.type !== 'header' && section.type !== 'contact') {
                <h3 class="preview-section-title">{{ section.title }}</h3>
              }
              @switch (section.type) {
                @case ('header') {
                  <app-header-section [data]="$any(section.data)" [editMode]="false" />
                }
                @case ('summary') {
                  <app-summary-section [data]="$any(section.data)" [editMode]="false" />
                }
                @case ('experience') {
                  <app-experience-section [data]="$any(section.data)" [editMode]="false" />
                }
                @case ('education') {
                  <app-education-section [data]="$any(section.data)" [editMode]="false" />
                }
                @case ('skills') {
                  <app-skills-section [data]="$any(section.data)" [editMode]="false" />
                }
                @case ('projects') {
                  <app-projects-section [data]="$any(section.data)" [editMode]="false" />
                }
                @case ('contact') {
                  <app-contact-section [data]="$any(section.data)" [editMode]="false" />
                }
                @case ('custom') {
                  <app-custom-section [data]="$any(section.data)" [editMode]="false" />
                }
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      flex: 1;
      height: 100%;
      overflow: hidden;
    }

    .preview-container {
      display: flex;
      flex-direction: column;
      background: var(--preview-bg);
      overflow: hidden;
      height: 100%;
    }

    .preview-header {
      padding: 16px 20px 12px;
      flex-shrink: 0;
    }
    .preview-header h2 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }

    .preview-scroll-area {
      flex: 1;
      overflow-y: auto;
      padding: 0 20px 30px;
      display: flex;
      justify-content: center;
    }

    .resume-page {
      width: 210mm;
      min-height: 297mm;
      max-width: 100%;
      background: white;
      color: #1a1a2e;
      padding: 32px 36px;
      box-shadow: 0 4px 32px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      flex-shrink: 0;
    }

    .preview-section {
      margin-bottom: 18px;
    }
    .preview-section:last-child { margin-bottom: 0; }

    .preview-section-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--accent, #6366f1);
      margin: 0 0 10px;
      padding-bottom: 6px;
      border-bottom: 2px solid var(--accent, #6366f1);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  `],
})
export class PreviewComponent {
  readonly resumeService = inject(ResumeService);
  private readonly templateService = inject(TemplateService);

  readonly previewElement = viewChild<ElementRef>('resumePreview');

  templateClass(): string {
    const tpl = this.templateService.getTemplateById(this.resumeService.templateId());
    return tpl ? tpl.previewClass : 'template-modern';
  }

  getPreviewElement(): HTMLElement | null {
    const el = this.previewElement();
    return el ? el.nativeElement : null;
  }
}
