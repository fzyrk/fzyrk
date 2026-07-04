import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactData } from '../../../models/resume.model';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (editMode()) {
      <div class="section-edit">
        <div class="field-row">
          <div class="field-group flex-1">
            <label>Email</label>
            <input type="email" [ngModel]="data().email" (ngModelChange)="onFieldChange('email', $event)" placeholder="your@email.com" />
          </div>
          <div class="field-group flex-1">
            <label>Phone</label>
            <input type="tel" [ngModel]="data().phone" (ngModelChange)="onFieldChange('phone', $event)" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
        <div class="field-group">
          <label>Location</label>
          <input type="text" [ngModel]="data().location" (ngModelChange)="onFieldChange('location', $event)" placeholder="City, State" />
        </div>
        <div class="field-row">
          <div class="field-group flex-1">
            <label>LinkedIn</label>
            <input type="text" [ngModel]="data().linkedin" (ngModelChange)="onFieldChange('linkedin', $event)" placeholder="linkedin.com/in/..." />
          </div>
          <div class="field-group flex-1">
            <label>GitHub</label>
            <input type="text" [ngModel]="data().github" (ngModelChange)="onFieldChange('github', $event)" placeholder="github.com/..." />
          </div>
        </div>
        <div class="field-group">
          <label>Website</label>
          <input type="text" [ngModel]="data().website" (ngModelChange)="onFieldChange('website', $event)" placeholder="yoursite.com" />
        </div>
      </div>
    } @else {
      <div class="section-preview contact-preview">
        <div class="contact-items">
          @if (data().email) {
            <span class="contact-item">
              <span class="contact-icon">✉</span> {{ data().email }}
            </span>
          }
          @if (data().phone) {
            <span class="contact-item">
              <span class="contact-icon">☎</span> {{ data().phone }}
            </span>
          }
          @if (data().location) {
            <span class="contact-item">
              <span class="contact-icon">◎</span> {{ data().location }}
            </span>
          }
          @if (data().linkedin) {
            <span class="contact-item">
              <span class="contact-icon">in</span> {{ data().linkedin }}
            </span>
          }
          @if (data().github) {
            <span class="contact-item">
              <span class="contact-icon">⌂</span> {{ data().github }}
            </span>
          }
          @if (data().website) {
            <span class="contact-item">
              <span class="contact-icon">⊕</span> {{ data().website }}
            </span>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .section-edit { display: flex; flex-direction: column; gap: 12px; }
    .field-row { display: flex; gap: 10px; }
    .flex-1 { flex: 1; }
    .field-group { display: flex; flex-direction: column; gap: 4px; }
    .field-group label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
    .field-group input { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.85rem; background: var(--input-bg); color: var(--text-primary); font-family: inherit; transition: border-color 0.2s; }
    .field-group input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    .contact-items { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
    .contact-item { display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; color: var(--text-secondary); }
    .contact-icon { font-size: 0.7rem; color: var(--accent); font-weight: 700; }
  `],
})
export class ContactSectionComponent {
  readonly data = input.required<ContactData>();
  readonly editMode = input(false);
  readonly dataChange = output<ContactData>();

  onFieldChange(field: keyof ContactData, value: string): void {
    this.dataChange.emit({ ...this.data(), [field]: value });
  }
}
