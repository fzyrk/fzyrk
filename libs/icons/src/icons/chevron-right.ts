import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-chevron-right',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class ChevronRightIcon { @Input() size: number | string = 24; }
