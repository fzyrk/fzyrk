import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-user',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class UserIcon { @Input() size: number | string = 24; }
