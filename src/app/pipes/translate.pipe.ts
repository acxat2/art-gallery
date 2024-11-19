import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {

  transform(value: string): string {
    let translate = '';
    switch (value) {
      case 'birthday': translate = 'День рождения'; break;
      case 'artSchool': translate = 'Художка'; break;
      case 'holiday': translate = 'Праздник'; break;
      case 'mother': translate = 'Мама'; break;
      case 'father': translate = 'Папа'; break;
      case 'brother': translate = 'Брат'; break;
      case 'grandmother': translate = 'Бабушка'; break;
      case 'lelya': translate = 'Лёля'; break;
      case 'another': translate = 'другое'; break;
    }
    return translate ? translate : value;
  }

}
