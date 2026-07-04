import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-search',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class SearchIcon { @Input() size: number | string = 24; }
