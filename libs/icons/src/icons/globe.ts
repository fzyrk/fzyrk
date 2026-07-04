import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-globe',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class GlobeIcon { @Input() size: number | string = 24; }
