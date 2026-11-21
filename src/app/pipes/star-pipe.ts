import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'star',
})
export class StarPipe implements PipeTransform {
  transform(note: number): string {
    const etoilesPleines = '★'.repeat(Math.max(0, note));
    const etoilesVides = '☆'.repeat(5 - etoilesPleines.length);
    return etoilesPleines + etoilesVides;
  }
}
