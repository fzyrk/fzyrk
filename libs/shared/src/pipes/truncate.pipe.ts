import { Pipe, PipeTransform } from '@angular/core';

/** Truncates text to a max length, appending '...' if truncated */
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength = 100, ellipsis = '...'): string {
    if (!value || value.length <= maxLength) return value;
    return value.slice(0, maxLength).trimEnd() + ellipsis;
  }
}
