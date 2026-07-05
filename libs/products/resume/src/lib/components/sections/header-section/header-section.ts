import { Component, input, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderData } from '../../../models/resume.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-header-section',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (editMode()) {
      <div class="section-edit">
        <div class="photo-upload-area">
          @if (data().photoUrl) {
            <div class="photo-preview-wrap">
              <img [src]="data().photoUrl" alt="Profile photo" class="photo-preview" />
              <button class="photo-remove-btn" (click)="removePhoto()" title="Remove photo">×</button>
            </div>
          } @else {
            <label class="photo-upload-label">
              <input type="file" accept="image/*" (change)="onPhotoUpload($event)" class="photo-input" />
              <span class="photo-placeholder">
                <span class="photo-icon">📷</span>
                <span>Upload Photo</span>
              </span>
            </label>
          }
        </div>
        <div class="field-group">
          <label>Full Name</label>
          <input type="text" [ngModel]="data().fullName" (ngModelChange)="onFieldChange('fullName', $event)" placeholder="Your full name" />
        </div>
        <div class="field-group">
          <label>Job Title</label>
          <input type="text" [ngModel]="data().jobTitle" (ngModelChange)="onFieldChange('jobTitle', $event)" placeholder="Your job title" />
        </div>
      </div>
    } @else {
      <div class="section-preview header-preview">
        @if (data().photoUrl) {
          <img [src]="data().photoUrl" alt="Profile photo" class="header-photo" />
        }
        <h1 class="header-name">{{ data().fullName }}</h1>
        <p class="header-title">{{ data().jobTitle }}</p>
      </div>
    }
  `,
  styles: [`
    .section-edit { display: flex; flex-direction: column; gap: 12px; }
    .field-group { display: flex; flex-direction: column; gap: 4px; }
    .field-group label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
    .field-group input { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem; background: var(--input-bg); color: var(--text-primary); transition: border-color 0.2s; font-family: inherit; }
    .field-group input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    .header-preview { text-align: center; }
    .header-name { font-size: 1.4rem; font-weight: 700; margin: 0; color: var(--text-primary); }
    .header-title { font-size: 0.95rem; color: var(--text-muted); margin: 4px 0 0; }

    .photo-upload-area { display: flex; justify-content: center; }
    .photo-input { display: none; }
    .photo-upload-label {
      cursor: pointer;
      display: block;
    }
    .photo-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 90px;
      border: 2px dashed var(--border-color);
      border-radius: 50%;
      color: var(--text-muted);
      font-size: 0.7rem;
      gap: 4px;
      transition: all 0.2s;
    }
    .photo-placeholder:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
    .photo-icon { font-size: 1.3rem; }

    .photo-preview-wrap { position: relative; display: inline-block; }
    .photo-preview {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--accent);
    }
    .photo-remove-btn {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #ef4444;
      color: white;
      border: 2px solid var(--card-bg);
      font-size: 0.8rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }
    .photo-remove-btn:hover { transform: scale(1.1); }
  `],
})
export class HeaderSectionComponent {
  readonly data = input.required<HeaderData>();
  readonly editMode = input(false);
  readonly dataChange = output<HeaderData>();
  private readonly toastService = inject(ToastService);

  onFieldChange(field: keyof HeaderData, value: string): void {
    this.dataChange.emit({ ...this.data(), [field]: value });
  }

  onPhotoUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      this.toastService.show('Photo must be under 500KB for LocalStorage compatibility.', 'danger');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.dataChange.emit({ ...this.data(), photoUrl: base64 });
    };
    reader.readAsDataURL(file);
  }

  removePhoto(): void {
    this.dataChange.emit({ ...this.data(), photoUrl: '' });
  }
}
