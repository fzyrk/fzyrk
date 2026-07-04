import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-book',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class BookIcon { @Input() size: number | string = 24; }
