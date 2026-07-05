import { Component, inject, ElementRef, viewChild, signal, computed, ChangeDetectionStrategy } from '@angular/core';
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
        <div class="preview-header-left">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="var(--accent)">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>
          <h2>Live Preview</h2>
        </div>

        <!-- Zoom Controls -->
        <div class="zoom-controls">
          <button class="zoom-btn" (click)="zoomOut()" [disabled]="zoom() <= 0.5" title="Zoom out">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
          </button>
          <span class="zoom-value">{{ zoomLabel() }}</span>
          <button class="zoom-btn" (click)="zoomIn()" [disabled]="zoom() >= 1.5" title="Zoom in">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </button>
          <button class="zoom-btn reset-zoom" (click)="resetZoom()" [class.active]="zoom() !== 1" title="Reset zoom">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="preview-scroll-area">
        <div class="preview-scale-wrapper" [style.transform]="'scale(' + zoom() + ')'" [style.transform-origin]="'top center'">
          <div
            #resumePreview
            class="resume-page"
            [class]="templateClass()"
            [style.font-family]="resumeService.fontFamily()"
            [style.--accent]="resumeService.accentColor()"
            [style.--accent-light]="accentLight()"
            [style.--accent-glow]="accentGlow()"
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
      padding: 12px 18px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
    }
    .preview-header-left {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .preview-header h2 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }

    /* Zoom Controls */
    .zoom-controls {
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 3px 6px;
    }
    .zoom-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-muted);
      padding: 4px 5px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      transition: all 0.15s;
    }
    .zoom-btn:hover { background: var(--accent-glow); color: var(--accent); }
    .zoom-btn:disabled { opacity: 0.3; cursor: not-allowed; pointer-events: none; }
    .zoom-btn.reset-zoom.active { color: var(--accent); }
    .zoom-value {
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--text-secondary);
      min-width: 32px;
      text-align: center;
    }

    .preview-scroll-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: auto;
      padding: 24px 20px 40px;
      display: flex;
      justify-content: center;
    }

    .preview-scale-wrapper {
      transition: transform 0.2s ease;
      transform-origin: top center;
      flex-shrink: 0;
    }

    .resume-page {
      width: 210mm;
      min-height: 297mm;
      max-width: 100%;
      background: white;
      color: #1a1a2e;
      padding: 32px 36px;
      box-shadow:
        0 2px 4px rgba(0,0,0,0.04),
        0 8px 24px rgba(0,0,0,0.10),
        0 24px 48px rgba(0,0,0,0.06);
      border-radius: 3px;
      flex-shrink: 0;
    }

    .preview-section {
      margin-bottom: 16px;
    }
    .preview-section:last-child { margin-bottom: 0; }

    .preview-section-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--accent, #6366f1);
      margin: 0 0 10px;
      padding-bottom: 5px;
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

  readonly zoom = signal(1);
  readonly zoomLabel = computed(() => `${Math.round(this.zoom() * 100)}%`);

  // Compute lighter accent variants for templates
  readonly accentLight = computed(() => {
    const hex = this.resumeService.accentColor();
    return hex + '99'; // 60% opacity
  });
  readonly accentGlow = computed(() => {
    const hex = this.resumeService.accentColor();
    return hex + '1f'; // 12% opacity
  });

  templateClass(): string {
    const tpl = this.templateService.getTemplateById(this.resumeService.templateId());
    return tpl ? tpl.previewClass : 'template-modern';
  }

  getPreviewElement(): HTMLElement | null {
    const el = this.previewElement();
    return el ? el.nativeElement : null;
  }

  /**
   * Returns the resume element with its scale wrapper temporarily set to
   * transform:none so html2canvas captures the true un-zoomed dimensions.
   * The caller is responsible for calling the returned restore() function.
   */
  getPreviewElementForExport(): { element: HTMLElement; restore: () => void } | null {
    const el = this.previewElement();
    if (!el) return null;

    const resumeEl: HTMLElement = el.nativeElement;
    // Walk up to find the scale wrapper and neutralise its transform
    const scaleWrapper = resumeEl.parentElement;
    const originalTransform = scaleWrapper?.style.transform ?? '';
    const originalTransformOrigin = scaleWrapper?.style.transformOrigin ?? '';

    if (scaleWrapper) {
      scaleWrapper.style.transform = 'none';
      scaleWrapper.style.transformOrigin = 'unset';
    }

    return {
      element: resumeEl,
      restore: () => {
        if (scaleWrapper) {
          scaleWrapper.style.transform = originalTransform;
          scaleWrapper.style.transformOrigin = originalTransformOrigin;
        }
      },
    };
  }

  zoomIn(): void {
    this.zoom.update(z => Math.min(1.5, Math.round((z + 0.1) * 10) / 10));
  }

  zoomOut(): void {
    this.zoom.update(z => Math.max(0.5, Math.round((z - 0.1) * 10) / 10));
  }

  resetZoom(): void {
    this.zoom.set(1);
  }
}
