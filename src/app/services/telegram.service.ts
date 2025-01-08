import { Injectable } from '@angular/core';
import { dateFormate } from '../helpers/date-format';

export type IStore = {
  name: string;
  birthday: string;
  comment: string
}


@Injectable({
  providedIn: 'root'
})

export class TelegramService {

  private TOKEN = '7620505652:AAFMEvBgYODBGq77OHyxaujmHIkKX3CxXT4';
  private chatID = '-4700772482';
  private URL = `https://api.telegram.org/bot${this.TOKEN}/sendMessage?chat_id=${this.chatID}&parse_mode=html&text=`

  public async setData(request: IStore) {
    const message = `Имя: ${request.name}%0D%0A
    Дата рождения: ${dateFormate(request.birthday)}%0D%0A
    Комментарий: ${request.comment}`

    try {
        const data = JSON.stringify(request);
        const response = await fetch(this.URL + message)
        return response.status;
    } catch (error) {
        console.error('Ошибка при отправке данных.', error);
        throw error;
    }
  }
  constructor() { }
}
