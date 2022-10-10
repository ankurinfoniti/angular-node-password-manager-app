import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starMasking',
})
export class StarMaskingPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return value
        .split('')
        .map((x) => '*')
        .join('');
    }
    return '';
  }
}
