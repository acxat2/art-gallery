import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'events',
  standalone: true
})
export class EventsPipe implements PipeTransform {

  transform(value: string): string {
    let event = '';
    switch (value) {
      case 'birthday': event = 'День рождения'; break;
      case 'artSchool': event = 'Художка'; break;
      case 'holiday': event = 'Праздник'; break;
      case 'mother': event = 'Мама'; break;
      case 'father': event = 'Папа'; break;
      case 'brother': event = 'Брат'; break;
      case 'grandmother': event = 'Бабушка'; break;
      case 'lelya': event = 'Лёля'; break;
      case 'another': event = 'другое'; break;
    }
    return event ? event : value;
  }

}
