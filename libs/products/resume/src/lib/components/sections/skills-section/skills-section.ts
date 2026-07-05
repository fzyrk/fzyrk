import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillsData } from '../../../models/resume.model';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (editMode()) {
      <div class="section-edit">
        @for (cat of data().categories; track $index; let i = $index) {
          <div class="skills-card">
            <div class="card-header">
              <input
                type="text"
                class="category-name-input"
                [ngModel]="cat.name"
                (ngModelChange)="onCategoryNameChange(i, $event)"
                placeholder="Category name"
              />
              <button class="btn-remove" (click)="removeCategory(i)" title="Remove category">×</button>
            </div>

            <!-- Individual skill tags with remove button -->
            <div class="skills-tags-edit">
              @for (skill of cat.skills; track $index; let j = $index) {
                <span class="skill-tag-edit">
                  {{ skill }}
                  <button class="skill-remove-btn" (click)="removeSkill(i, j)" title="Remove skill">
                    <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </span>
              }
              <!-- Add skill inline input -->
              <div class="add-skill-wrap">
                @if (addingSkillFor() === i) {
                  <input
                    #newSkillInput
                    type="text"
                    class="new-skill-input"
                    placeholder="Skill name"
                    (keydown.enter)="confirmSkill(i, newSkillInput)"
                    (keydown.escape)="addingSkillFor.set(-1)"
                    (blur)="confirmSkill(i, newSkillInput)"
                  />
                } @else {
                  <button class="add-skill-chip" (click)="addingSkillFor.set(i)">
                    + Add skill
                  </button>
                }
              </div>
            </div>

            <!-- Also keep the comma-separated quick input for power users -->
            <details class="quick-add-details">
              <summary class="quick-add-summary">Quick add (comma-separated)</summary>
              <div class="skills-input-area">
                <input
                  type="text"
                  placeholder="Skill 1, Skill 2, Skill 3"
                  (change)="onBulkSkillsAdd(i, $event)"
                />
                <span class="quick-add-hint">Press Enter to add all</span>
              </div>
            </details>
          </div>
        }
        <button class="btn-add" (click)="addCategory()">
          <span>+</span> Add Category
        </button>
      </div>
    } @else {
      <div class="section-preview">
        @for (cat of data().categories; track $index) {
          <div class="skill-category">
            @if (cat.name) {
              <span class="category-label">{{ cat.name }}</span>
            }
            <div class="skill-tags">
              @for (skill of cat.skills; track $index) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    /* Edit mode */
    .section-edit { display: flex; flex-direction: column; gap: 12px; }
    .skills-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
    .category-name-input { flex: 1; padding: 6px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-size: 0.85rem; font-weight: 600; background: var(--input-bg); color: var(--text-primary); font-family: inherit; transition: border-color 0.2s; }
    .category-name-input:focus { outline: none; border-color: var(--accent); }
    .btn-remove { background: none; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer; padding: 2px 6px; border-radius: 4px; transition: all 0.15s; line-height: 1; }
    .btn-remove:hover { background: rgba(239,68,68,0.1); color: #ef4444; }

    /* Individual skill tag editing */
    .skills-tags-edit { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .skill-tag-edit {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.73rem;
      padding: 3px 6px 3px 10px;
      border-radius: 20px;
      background: var(--accent-glow);
      color: var(--accent);
      font-weight: 500;
      border: 1px solid var(--accent);
      border-opacity: 0.3;
    }
    .skill-remove-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 1px;
      color: var(--accent);
      display: flex;
      align-items: center;
      border-radius: 50%;
      transition: all 0.15s;
      opacity: 0.6;
    }
    .skill-remove-btn:hover { opacity: 1; background: rgba(239,68,68,0.15); color: #ef4444; }

    /* Add skill inline */
    .add-skill-wrap { display: inline-flex; }
    .add-skill-chip {
      background: none;
      border: 1.5px dashed var(--border-color);
      border-radius: 20px;
      padding: 3px 10px;
      font-size: 0.72rem;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.15s;
      font-family: inherit;
    }
    .add-skill-chip:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }
    .new-skill-input {
      padding: 3px 10px;
      border: 1.5px solid var(--accent);
      border-radius: 20px;
      font-size: 0.72rem;
      background: var(--input-bg);
      color: var(--text-primary);
      font-family: inherit;
      outline: none;
      width: 110px;
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    /* Quick add */
    .quick-add-details { margin-top: 4px; }
    .quick-add-summary { font-size: 0.65rem; color: var(--text-muted); cursor: pointer; list-style: none; padding: 2px 0; }
    .quick-add-summary:hover { color: var(--accent); }
    .skills-input-area { display: flex; flex-direction: column; gap: 4px; margin-top: 6px; }
    .skills-input-area input { padding: 7px 10px; border: 1px solid var(--border-color); border-radius: 7px; font-size: 0.82rem; background: var(--input-bg); color: var(--text-primary); font-family: inherit; transition: border-color 0.2s; outline: none; }
    .skills-input-area input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    .quick-add-hint { font-size: 0.62rem; color: var(--text-muted); }

    .btn-add { padding: 9px; border: 2px dashed var(--border-color); border-radius: 10px; background: none; color: var(--text-muted); font-size: 0.83rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s; font-family: inherit; }
    .btn-add:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }

    /* Preview mode */
    .skill-category { margin-bottom: 10px; }
    .skill-category:last-child { margin-bottom: 0; }
    .category-label { font-size: 0.8rem; font-weight: 600; color: var(--text-primary); display: block; margin-bottom: 6px; }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 5px; }
    .skill-tag { font-size: 0.72rem; padding: 3px 10px; border-radius: 20px; background: var(--accent-glow); color: var(--accent); font-weight: 500; }
  `],
})
export class SkillsSectionComponent {
  readonly data = input.required<SkillsData>();
  readonly editMode = input(false);
  readonly dataChange = output<SkillsData>();

  readonly addingSkillFor = signal(-1);

  onCategoryNameChange(index: number, name: string): void {
    const categories = this.data().categories.map((cat, i) =>
      i === index ? { ...cat, name } : cat
    );
    this.dataChange.emit({ categories });
  }

  onSkillsChange(index: number, value: string): void {
    const skills = value.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    const categories = this.data().categories.map((cat, i) =>
      i === index ? { ...cat, skills } : cat
    );
    this.dataChange.emit({ categories });
  }

  onBulkSkillsAdd(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const newSkills = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const existing = this.data().categories[index].skills;
    const merged = [...existing, ...newSkills.filter(s => !existing.includes(s))];
    const categories = this.data().categories.map((cat, i) =>
      i === index ? { ...cat, skills: merged } : cat
    );
    this.dataChange.emit({ categories });
    (event.target as HTMLInputElement).value = '';
  }

  addCategory(): void {
    const categories = [...this.data().categories, { name: 'New Category', skills: [] }];
    this.dataChange.emit({ categories });
  }

  removeCategory(index: number): void {
    const categories = this.data().categories.filter((_, i) => i !== index);
    this.dataChange.emit({ categories });
  }

  removeSkill(catIndex: number, skillIndex: number): void {
    const categories = this.data().categories.map((cat, i) => {
      if (i !== catIndex) return cat;
      return { ...cat, skills: cat.skills.filter((_, si) => si !== skillIndex) };
    });
    this.dataChange.emit({ categories });
  }

  confirmSkill(catIndex: number, input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      const categories = this.data().categories.map((cat, i) => {
        if (i !== catIndex) return cat;
        // Avoid duplicates
        if (cat.skills.includes(value)) return cat;
        return { ...cat, skills: [...cat.skills, value] };
      });
      this.dataChange.emit({ categories });
    }
    input.value = '';
    this.addingSkillFor.set(-1);
  }
}
