import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-menu',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class MenuIcon { @Input() size: number | string = 24; }
