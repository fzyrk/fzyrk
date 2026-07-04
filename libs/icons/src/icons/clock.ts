import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-clock',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class ClockIcon { @Input() size: number | string = 24; }
