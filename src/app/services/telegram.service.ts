import { Injectable } from '@angular/core';
import { dateFormate } from '../helpers/date-format';
import { env } from '../../../environment/tg-env';

export type IStore = {
  name: string;
  birthday: string;
  comment: string;
  login: string
}

@Injectable({
  providedIn: 'root'
})

export class TelegramService {

  private TOKEN = env['TG-TOKEN']
  private chatID = env['CHAT-ID'];
  private URLNewUser = `https://api.telegram.org/bot${this.TOKEN}/sendMessage?chat_id=${this.chatID}&parse_mode=html&text=`

  public async setData(user: IStore) {
    const message = `Имя: ${user.name}%0D%0A
login: ${user.login}
Дата рождения: ${dateFormate(user.birthday)}%0D%0A
Комментарий: ${user.comment}`

    try {
        const response = await fetch(this.URLNewUser + message)
        return response.status;
    } catch (error) {
        console.error('Ошибка при отправке данных.', error);
        throw error;
    }
  }

  public async publicImage(message: string) {
    try {
        const response = await fetch(this.URLNewUser + message)
        return response.status;
    } catch (error) {
        console.error('Ошибка при отправке данных.', error);
        throw error;
    }
  }

  constructor() { }
}
