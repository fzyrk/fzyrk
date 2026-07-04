import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-briefcase',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class BriefcaseIcon { @Input() size: number | string = 24; }
