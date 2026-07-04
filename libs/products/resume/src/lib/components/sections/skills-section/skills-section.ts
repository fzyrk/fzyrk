import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
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
              <input type="text" class="category-name-input" [ngModel]="cat.name" (ngModelChange)="onCategoryNameChange(i, $event)" placeholder="Category name" />
              <button class="btn-remove" (click)="removeCategory(i)" title="Remove">×</button>
            </div>
            <div class="skills-input-area">
              <label>Skills (comma-separated)</label>
              <input type="text" [ngModel]="cat.skills.join(', ')" (ngModelChange)="onSkillsChange(i, $event)" placeholder="Skill 1, Skill 2, Skill 3" />
            </div>
          </div>
        }
        <button class="btn-add" (click)="addCategory()">
          <span class="btn-icon">+</span> Add Category
        </button>
      </div>
    } @else {
      <div class="section-preview">
        @for (cat of data().categories; track $index) {
          <div class="skill-category">
            <span class="category-label">{{ cat.name }}</span>
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
    .section-edit { display: flex; flex-direction: column; gap: 14px; }
    .skills-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
    .category-name-input { flex: 1; padding: 6px 10px; border: 1px solid var(--border-color); border-radius: 6px; font-size: 0.85rem; font-weight: 600; background: var(--input-bg); color: var(--text-primary); font-family: inherit; }
    .category-name-input:focus { outline: none; border-color: var(--accent); }
    .btn-remove { background: none; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer; padding: 2px 6px; border-radius: 4px; transition: all 0.2s; }
    .btn-remove:hover { background: #fee2e2; color: #ef4444; }
    .skills-input-area { display: flex; flex-direction: column; gap: 4px; }
    .skills-input-area label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
    .skills-input-area input { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.85rem; background: var(--input-bg); color: var(--text-primary); font-family: inherit; }
    .skills-input-area input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    .btn-add { padding: 10px; border: 2px dashed var(--border-color); border-radius: 10px; background: none; color: var(--text-muted); font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s; font-family: inherit; }
    .btn-add:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }
    .btn-icon { font-size: 1.1rem; font-weight: 700; }
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

  addCategory(): void {
    const categories = [...this.data().categories, { name: 'New Category', skills: [] }];
    this.dataChange.emit({ categories });
  }

  removeCategory(index: number): void {
    const categories = this.data().categories.filter((_, i) => i !== index);
    this.dataChange.emit({ categories });
  }
}
