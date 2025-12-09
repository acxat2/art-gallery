import { Pipe, PipeTransform } from '@angular/core';
import { reverseDate } from '../helpers/date-format';

@Pipe({
  name: 'revertDate',
  standalone: true
})
export class ReverseDatePipe implements PipeTransform {

  transform(value: string): string {
    return reverseDate(value);
  }

}
