import { Component, Input, computed, input, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ICON_MAP } from './icon-registry.service';

/**
 * Generic icon wrapper component.
 * Usage: <fz-icon name="arrow-right" [size]="20" />
 */
@Component({
  selector: 'fz-icon',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    @if (iconComponent()) {
      <ng-container [ngComponentOutlet]="iconComponent()!" [ngComponentOutletInputs]="{ size: size }" />
    }
  `,
  styles: [':host { display: inline-flex; align-items: center; line-height: 0; }']
})
export class FzIconComponent {
  @Input() name = '';
  @Input() size: number | string = 24;

  iconComponent(): Type<unknown> | null {
    return ICON_MAP[this.name] ?? null;
  }
}
