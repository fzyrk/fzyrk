import { Component, Input } from '@angular/core';

@Component({
  selector: 'fz-icon-close',
  standalone: true,
  template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  styles: [':host { display: inline-flex; align-items: center; }']
})
export class CloseIcon { @Input() size: number | string = 24; }
