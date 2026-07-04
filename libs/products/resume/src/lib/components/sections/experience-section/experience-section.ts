import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExperienceData, ExperienceItem, generateId } from '../../../models/resume.model';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (editMode()) {
      <div class="section-edit">
        @for (item of data().items; track item.id; let i = $index) {
          <div class="experience-card">
            <div class="card-header">
              <span class="card-number">{{ i + 1 }}</span>
              <button class="btn-remove" (click)="removeItem(i)" title="Remove">×</button>
            </div>
            <div class="field-row">
              <div class="field-group flex-1">
                <label>Company</label>
                <input type="text" [ngModel]="item.company" (ngModelChange)="onItemChange(i, 'company', $event)" />
              </div>
              <div class="field-group flex-1">
                <label>Role</label>
                <input type="text" [ngModel]="item.role" (ngModelChange)="onItemChange(i, 'role', $event)" />
              </div>
            </div>
            <div class="field-row">
              <div class="field-group flex-1">
                <label>Start Date</label>
                <input type="text" [ngModel]="item.startDate" (ngModelChange)="onItemChange(i, 'startDate', $event)" placeholder="e.g. Jan 2021" />
              </div>
              <div class="field-group flex-1">
                <label>End Date</label>
                <input type="text" [ngModel]="item.endDate" (ngModelChange)="onItemChange(i, 'endDate', $event)" placeholder="e.g. Present" />
              </div>
            </div>
            <div class="field-group">
              <label>Description</label>
              <textarea [ngModel]="item.description" (ngModelChange)="onItemChange(i, 'description', $event)" rows="3" placeholder="Describe your responsibilities..."></textarea>
            </div>
          </div>
        }
        <button class="btn-add" (click)="addItem()">
          <span class="btn-icon">+</span> Add Experience
        </button>
      </div>
    } @else {
      <div class="section-preview">
        @for (item of data().items; track item.id) {
          <div class="experience-entry">
            <div class="entry-header">
              <div>
                <h4 class="entry-role">{{ item.role }}</h4>
                <p class="entry-company">{{ item.company }}</p>
              </div>
              <span class="entry-dates">{{ item.startDate }} — {{ item.endDate }}</span>
            </div>
            <p class="entry-description">{{ item.description }}</p>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .section-edit { display: flex; flex-direction: column; gap: 16px; }
    .experience-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; }
    .card-number { font-size: 0.7rem; font-weight: 700; background: var(--accent); color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .btn-remove { background: none; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer; padding: 2px 6px; border-radius: 4px; transition: all 0.2s; }
    .btn-remove:hover { background: #fee2e2; color: #ef4444; }
    .field-row { display: flex; gap: 10px; }
    .flex-1 { flex: 1; }
    .field-group { display: flex; flex-direction: column; gap: 4px; }
    .field-group label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
    .field-group input, .field-group textarea { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.85rem; background: var(--input-bg); color: var(--text-primary); font-family: inherit; transition: border-color 0.2s; }
    .field-group input:focus, .field-group textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    .field-group textarea { resize: vertical; }
    .btn-add { padding: 10px; border: 2px dashed var(--border-color); border-radius: 10px; background: none; color: var(--text-muted); font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s; font-family: inherit; }
    .btn-add:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }
    .btn-icon { font-size: 1.1rem; font-weight: 700; }
    .experience-entry { margin-bottom: 12px; }
    .experience-entry:last-child { margin-bottom: 0; }
    .entry-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
    .entry-role { font-size: 0.9rem; font-weight: 600; margin: 0; color: var(--text-primary); }
    .entry-company { font-size: 0.8rem; color: var(--accent); margin: 2px 0 0; }
    .entry-dates { font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; }
    .entry-description { font-size: 0.8rem; line-height: 1.5; color: var(--text-secondary); margin: 6px 0 0; }
  `],
})
export class ExperienceSectionComponent {
  readonly data = input.required<ExperienceData>();
  readonly editMode = input(false);
  readonly dataChange = output<ExperienceData>();

  onItemChange(index: number, field: keyof ExperienceItem, value: string): void {
    const items = this.data().items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    this.dataChange.emit({ items });
  }

  addItem(): void {
    const items = [
      ...this.data().items,
      { id: generateId(), company: '', role: '', startDate: '', endDate: '', description: '' },
    ];
    this.dataChange.emit({ items });
  }

  removeItem(index: number): void {
    const items = this.data().items.filter((_, i) => i !== index);
    this.dataChange.emit({ items });
  }
}
