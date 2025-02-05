import { Injectable } from '@angular/core';
import { dateFormate } from '../helpers/date-format';
import { env } from '../../../environment/tg-env';

export type IStore = {
  name: string;
  birthday: string;
  comment: string
}


@Injectable({
  providedIn: 'root'
})

export class TelegramService {

  private TOKEN = env['TG-TOKEN']
  private chatID = env['CHAT-ID'];
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
