import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SummaryData } from '../../../models/resume.model';

@Component({
  selector: 'app-summary-section',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (editMode()) {
      <div class="section-edit">
        <div class="field-group">
          <label>Professional Summary</label>
          <textarea [ngModel]="data().text" (ngModelChange)="onFieldChange($event)" placeholder="Write a brief professional summary..." rows="4"></textarea>
        </div>
      </div>
    } @else {
      <div class="section-preview">
        <p class="summary-text">{{ data().text }}</p>
      </div>
    }
  `,
  styles: [`
    .section-edit { display: flex; flex-direction: column; gap: 12px; }
    .field-group { display: flex; flex-direction: column; gap: 4px; }
    .field-group label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
    .field-group textarea { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem; background: var(--input-bg); color: var(--text-primary); resize: vertical; font-family: inherit; transition: border-color 0.2s; }
    .field-group textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    .summary-text { font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary); margin: 0; }
  `],
})
export class SummarySectionComponent {
  readonly data = input.required<SummaryData>();
  readonly editMode = input(false);
  readonly dataChange = output<SummaryData>();

  onFieldChange(value: string): void {
    this.dataChange.emit({ text: value });
  }
}
