import { Injectable, inject, signal, computed, effect } from '@angular/core';
import {
  ResumeData,
  ResumeSection,
  SectionType,
  SectionData,
  DEFAULT_RESUME,
  generateId,
  HeaderData,
  SummaryData,
  ExperienceData,
  EducationData,
  SkillsData,
  ProjectsData,
  ContactData,
  CustomData,
} from '../models/resume.model';
import { PersistenceService } from './persistence.service';
import { FontService } from './font.service';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private readonly persistence = inject(PersistenceService);
  private readonly fontService = inject(FontService);

  // Undo/Redo history — historyIndex is a signal so canUndo/canRedo are reactive
  private history: ResumeData[] = [];
  private readonly _historyIndex = signal(-1);
  private readonly maxHistory = 50;
  private skipHistory = false;

  private readonly _resume = signal<ResumeData>(this.loadInitial());
  readonly resume = this._resume.asReadonly();

  readonly sections = computed(() =>
    [...this._resume().sections]
      .filter((s) => s.visible)
      .sort((a, b) => a.order - b.order)
  );

  readonly allSections = computed(() =>
    [...this._resume().sections].sort((a, b) => a.order - b.order)
  );

  readonly templateId = computed(() => this._resume().templateId);
  readonly fontFamily = computed(() => this._resume().fontFamily);
  readonly accentColor = computed(() => this._resume().accentColor);
  readonly resumeName = computed(() => this._resume().name);

  // Reactive undo/redo availability
  readonly canUndo = computed(() => this._historyIndex() > 0);
  readonly canRedo = computed(() => this._historyIndex() < this.history.length - 1);

  // Resume completeness score (0–100)
  readonly completenessScore = computed(() => {
    const sections = this._resume().sections;
    let score = 0;
    const checks = [
      // Header has a real name
      sections.some(s => s.type === 'header' && (s.data as HeaderData).fullName?.trim().length > 2 && (s.data as HeaderData).fullName !== 'John Doe' && (s.data as HeaderData).fullName !== 'Your Name'),
      // Header has a job title
      sections.some(s => s.type === 'header' && (s.data as HeaderData).jobTitle?.trim().length > 2 && (s.data as HeaderData).jobTitle !== 'Your Title'),
      // Contact has email
      sections.some(s => s.type === 'contact' && (s.data as ContactData).email?.trim()),
      // Contact has phone
      sections.some(s => s.type === 'contact' && (s.data as ContactData).phone?.trim()),
      // Contact has location
      sections.some(s => s.type === 'contact' && (s.data as ContactData).location?.trim()),
      // Has summary with real content
      sections.some(s => s.type === 'summary' && (s.data as SummaryData).text?.trim().length > 50),
      // Has experience with at least 1 item
      sections.some(s => s.type === 'experience' && (s.data as ExperienceData).items?.length > 0),
      // Has experience description
      sections.some(s => s.type === 'experience' && (s.data as ExperienceData).items?.some(i => i.description?.trim().length > 20)),
      // Has education
      sections.some(s => s.type === 'education' && (s.data as EducationData).items?.length > 0),
      // Has skills
      sections.some(s => s.type === 'skills' && (s.data as SkillsData).categories?.some(c => c.skills.length > 0)),
    ];
    score = Math.round((checks.filter(Boolean).length / checks.length) * 100);
    return score;
  });

  constructor() {
    // Load the initial font
    this.fontService.loadFont(this._resume().fontFamily);

    // Auto-save on any change
    effect(() => {
      const data = this._resume();
      this.persistence.save(data);
    });
  }

  private loadInitial(): ResumeData {
    // Use the injected persistence service (already available at construction time via inject())
    const saved = this.persistence.loadLatest();
    const data = saved ?? { ...DEFAULT_RESUME };
    this.pushHistory(data);
    return data;
  }

  private pushHistory(data: ResumeData): void {
    if (this.skipHistory) return;
    // Remove any future history if we're not at the end
    const currentIndex = this._historyIndex();
    this.history = this.history.slice(0, currentIndex + 1);
    this.history.push(JSON.parse(JSON.stringify(data)));
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
    this._historyIndex.set(this.history.length - 1);
  }

  private update(partial: Partial<ResumeData>): void {
    const updated = {
      ...this._resume(),
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    this._resume.set(updated);
    this.pushHistory(updated);
  }

  undo(): void {
    if (!this.canUndo()) return;
    this._historyIndex.update(i => i - 1);
    this.skipHistory = true;
    this._resume.set(JSON.parse(JSON.stringify(this.history[this._historyIndex()])));
    this.skipHistory = false;
  }

  redo(): void {
    if (!this.canRedo()) return;
    this._historyIndex.update(i => i + 1);
    this.skipHistory = true;
    this._resume.set(JSON.parse(JSON.stringify(this.history[this._historyIndex()])));
    this.skipHistory = false;
  }

  // Section operations
  addSection(type: SectionType): void {
    const sections = [...this._resume().sections];
    const newSection: ResumeSection = {
      id: generateId(),
      type,
      title: this.getDefaultTitle(type),
      visible: true,
      order: sections.length,
      data: this.getDefaultData(type),
    };
    sections.push(newSection);
    this.update({ sections });
  }

  removeSection(id: string): void {
    const sections = this._resume()
      .sections.filter((s) => s.id !== id)
      .map((s, i) => ({ ...s, order: i }));
    this.update({ sections });
  }

  updateSection(id: string, data: Partial<ResumeSection>): void {
    const sections = this._resume().sections.map((s) =>
      s.id === id ? { ...s, ...data } : s
    );
    this.update({ sections });
  }

  updateSectionData(id: string, data: SectionData): void {
    const sections = this._resume().sections.map((s) =>
      s.id === id ? { ...s, data } : s
    );
    this.update({ sections });
  }

  reorderSections(previousIndex: number, currentIndex: number): void {
    const sections = [...this._resume().sections].sort(
      (a, b) => a.order - b.order
    );
    const [moved] = sections.splice(previousIndex, 1);
    sections.splice(currentIndex, 0, moved);
    const reordered = sections.map((s, i) => ({ ...s, order: i }));
    this.update({ sections: reordered });
  }

  toggleSectionVisibility(id: string): void {
    const sections = this._resume().sections.map((s) =>
      s.id === id ? { ...s, visible: !s.visible } : s
    );
    this.update({ sections });
  }

  duplicateSection(id: string): void {
    const sections = [...this._resume().sections];
    const source = sections.find((s) => s.id === id);
    if (!source) return;
    const duplicate: ResumeSection = {
      ...JSON.parse(JSON.stringify(source)),
      id: generateId(),
      title: source.title + ' (Copy)',
      order: sections.length,
    };
    sections.push(duplicate);
    this.update({ sections });
  }

  // Template / Font / Color
  updateTemplate(templateId: string): void {
    this.update({ templateId });
  }

  updateFont(fontFamily: string): void {
    this.fontService.loadFont(fontFamily);
    this.update({ fontFamily });
  }

  updateAccentColor(color: string): void {
    this.update({ accentColor: color });
  }

  updateResumeName(name: string): void {
    this.update({ name });
  }

  // Reset to default
  resetResume(): void {
    const fresh: ResumeData = {
      ...DEFAULT_RESUME,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this._resume.set(fresh);
    this.pushHistory(fresh);
  }

  // Load a specific resume (for multi-resume dashboard)
  loadResume(data: ResumeData): void {
    this.fontService.loadFont(data.fontFamily);
    this.history = [];
    this._historyIndex.set(-1);
    this._resume.set(data);
    this.pushHistory(data);
  }

  private getDefaultTitle(type: SectionType): string {
    const titles: Record<SectionType, string> = {
      header: 'Header',
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      custom: 'Custom Section',
    };
    return titles[type];
  }

  private getDefaultData(type: SectionType): SectionData {
    const defaults: Record<SectionType, SectionData> = {
      header: { fullName: 'Your Name', jobTitle: 'Your Title', photoUrl: '' } as HeaderData,
      summary: { text: 'Write your professional summary here...' } as SummaryData,
      experience: {
        items: [
          { id: generateId(), company: 'Company Name', role: 'Job Title', startDate: 'Start', endDate: 'End', description: 'Describe your responsibilities and achievements...' },
        ],
      } as ExperienceData,
      education: {
        items: [
          { id: generateId(), school: 'University Name', degree: 'Degree', startDate: 'Start', endDate: 'End', gpa: '' },
        ],
      } as EducationData,
      skills: {
        categories: [{ name: 'Category', skills: ['Skill 1', 'Skill 2', 'Skill 3'] }],
      } as SkillsData,
      projects: {
        items: [
          { id: generateId(), name: 'Project Name', description: 'Project description...', link: '', technologies: '' },
        ],
      } as ProjectsData,
      contact: {
        email: 'email@example.com', phone: '', location: '', linkedin: '', github: '', website: '',
      } as ContactData,
      custom: { content: 'Add your content here...' } as CustomData,
    };
    return defaults[type];
  }
}
