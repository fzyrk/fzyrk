import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-moon',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class MoonIcon { @Input() size: number | string = 24; }
