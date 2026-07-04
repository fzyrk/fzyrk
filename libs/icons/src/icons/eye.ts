import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-eye',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class EyeIcon { @Input() size: number | string = 24; }
