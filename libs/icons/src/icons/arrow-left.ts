import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-arrow-left',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class ArrowLeftIcon { @Input() size: number | string = 24; }
