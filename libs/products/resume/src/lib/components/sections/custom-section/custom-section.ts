import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomData } from '../../../models/resume.model';

@Component({
  selector: 'app-custom-section',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (editMode()) {
      <div class="section-edit">
        <div class="field-group">
          <label>Content</label>
          <textarea [ngModel]="data().content" (ngModelChange)="onFieldChange($event)" placeholder="Add your content here..." rows="4"></textarea>
        </div>
      </div>
    } @else {
      <div class="section-preview">
        <p class="custom-text">{{ data().content }}</p>
      </div>
    }
  `,
  styles: [`
    .section-edit { display: flex; flex-direction: column; gap: 12px; }
    .field-group { display: flex; flex-direction: column; gap: 4px; }
    .field-group label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
    .field-group textarea { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem; background: var(--input-bg); color: var(--text-primary); resize: vertical; font-family: inherit; transition: border-color 0.2s; }
    .field-group textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    .custom-text { font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary); margin: 0; white-space: pre-wrap; }
  `],
})
export class CustomSectionComponent {
  readonly data = input.required<CustomData>();
  readonly editMode = input(false);
  readonly dataChange = output<CustomData>();

  onFieldChange(value: string): void {
    this.dataChange.emit({ content: value });
  }
}
