import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EducationData, EducationItem, generateId } from '../../../models/resume.model';

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (editMode()) {
      <div class="section-edit">
        @for (item of data().items; track item.id; let i = $index) {
          <div class="education-card">
            <div class="card-header">
              <span class="card-number">{{ i + 1 }}</span>
              <button class="btn-remove" (click)="removeItem(i)" title="Remove">×</button>
            </div>
            <div class="field-row">
              <div class="field-group flex-1">
                <label>School / University</label>
                <input type="text" [ngModel]="item.school" (ngModelChange)="onItemChange(i, 'school', $event)" />
              </div>
              <div class="field-group flex-1">
                <label>Degree</label>
                <input type="text" [ngModel]="item.degree" (ngModelChange)="onItemChange(i, 'degree', $event)" />
              </div>
            </div>
            <div class="field-row">
              <div class="field-group flex-1">
                <label>Start Year</label>
                <input type="text" [ngModel]="item.startDate" (ngModelChange)="onItemChange(i, 'startDate', $event)" />
              </div>
              <div class="field-group flex-1">
                <label>End Year</label>
                <input type="text" [ngModel]="item.endDate" (ngModelChange)="onItemChange(i, 'endDate', $event)" />
              </div>
              <div class="field-group">
                <label>GPA</label>
                <input type="text" [ngModel]="item.gpa" (ngModelChange)="onItemChange(i, 'gpa', $event)" placeholder="Optional" style="width: 80px" />
              </div>
            </div>
          </div>
        }
        <button class="btn-add" (click)="addItem()">
          <span class="btn-icon">+</span> Add Education
        </button>
      </div>
    } @else {
      <div class="section-preview">
        @for (item of data().items; track item.id) {
          <div class="education-entry">
            <div class="entry-header">
              <div>
                <h4 class="entry-degree">{{ item.degree }}</h4>
                <p class="entry-school">{{ item.school }}</p>
              </div>
              <div class="entry-meta">
                <span class="entry-dates">{{ item.startDate }} — {{ item.endDate }}</span>
                @if (item.gpa) {
                  <span class="entry-gpa">GPA: {{ item.gpa }}</span>
                }
              </div>
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .section-edit { display: flex; flex-direction: column; gap: 16px; }
    .education-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; }
    .card-number { font-size: 0.7rem; font-weight: 700; background: var(--accent); color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .btn-remove { background: none; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer; padding: 2px 6px; border-radius: 4px; transition: all 0.2s; }
    .btn-remove:hover { background: #fee2e2; color: #ef4444; }
    .field-row { display: flex; gap: 10px; }
    .flex-1 { flex: 1; }
    .field-group { display: flex; flex-direction: column; gap: 4px; }
    .field-group label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
    .field-group input { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.85rem; background: var(--input-bg); color: var(--text-primary); font-family: inherit; transition: border-color 0.2s; }
    .field-group input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    .btn-add { padding: 10px; border: 2px dashed var(--border-color); border-radius: 10px; background: none; color: var(--text-muted); font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s; font-family: inherit; }
    .btn-add:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }
    .btn-icon { font-size: 1.1rem; font-weight: 700; }
    .education-entry { margin-bottom: 10px; }
    .education-entry:last-child { margin-bottom: 0; }
    .entry-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .entry-degree { font-size: 0.9rem; font-weight: 600; margin: 0; color: var(--text-primary); }
    .entry-school { font-size: 0.8rem; color: var(--accent); margin: 2px 0 0; }
    .entry-meta { text-align: right; }
    .entry-dates { font-size: 0.75rem; color: var(--text-muted); display: block; }
    .entry-gpa { font-size: 0.75rem; color: var(--text-muted); }
  `],
})
export class EducationSectionComponent {
  readonly data = input.required<EducationData>();
  readonly editMode = input(false);
  readonly dataChange = output<EducationData>();

  onItemChange(index: number, field: keyof EducationItem, value: string): void {
    const items = this.data().items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    this.dataChange.emit({ items });
  }

  addItem(): void {
    const items = [
      ...this.data().items,
      { id: generateId(), school: '', degree: '', startDate: '', endDate: '', gpa: '' },
    ];
    this.dataChange.emit({ items });
  }

  removeItem(index: number): void {
    const items = this.data().items.filter((_, i) => i !== index);
    this.dataChange.emit({ items });
  }
}
