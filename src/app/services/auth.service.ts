import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User, users } from '../../base/users';
import { auth } from '../guards/auth';
import { getFullYear } from '../helpers/helpers';
import { StorageService } from './storage.service';

export type Modal = {
  active: boolean,
  error: boolean,
  modalText: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuth = false;
  public isAdult = false;
  private userName = '';

  private date = new Date();
  private today = `${this.date.getDate() > 9 ? this.date.getDate() : '0' + this.date.getDate()}.${this.date.getMonth() + 1}`


  private modal = {
    active: false,
    error: false,
    modalText: ''
  };
  private STORAGEKEY = 'art-studio';

  public modal$ = new BehaviorSubject<Modal>(this.modal);
  public isAuth$ = new BehaviorSubject<boolean>(this.isAuth);
  public userName$ = new BehaviorSubject<string>(this.userName);
  public authQuest$ = new BehaviorSubject<boolean>(auth.isLoggedIn)

  public isAuthIn(user: User): void {
    const findUser= users.find(us => us.name === user.name);

    if (!findUser) {
      this.modal.modalText = 'Такой пользователь не зарегистрирован';
      this.modal.active = true;
      this.modal.error = true;
      return;
    }

    if (findUser?.birthday !== user.birthday) {
      this.modalActive('Не правильный пароль', true)
      return;
    }

    if (getFullYear(user.birthday) >= 18) {
      this.isAdult = true;
    }

    if (findUser.role === 'admin' || user.birthday.slice(0, 5) === this.today) {
      this.isAuth = true;
      auth.isLoggedIn = true;
      this.authQuest$.next(auth.isLoggedIn);
    }

    this.userName = user.name;
    this.userName$.next(this.userName);
    this.router.navigate(['']);
    this.isAuth = true;
    this.isAuth$.next(this.isAuth);

    this.storage.saveToStorage(this.STORAGEKEY, JSON.stringify(findUser));
    console.log('authService')
    this.modalActive(`Добро пожаловать ${findUser.name}`, false);

  }

  public isAuthOut() {
    this.isAuth = auth.isLoggedIn = false;
    this.isAuth$.next(this.isAuth);
    this.userName = '';
    this.userName$.next(this.userName);
    auth.isLoggedIn = false;
    this.authQuest$.next(auth.isLoggedIn);

    this.storage.saveToStorage(this.STORAGEKEY, '');
    location.reload()
  }

  private modalActive(text: string, error: boolean) {
    this.modal.modalText = text;
    this.modal.active = true;
    this.modal.error = error;
    this.modal$.next(this.modal);
  }

  public modalClose() {
    this.modal.modalText = '';
    this.modal.active = false;
    this.modal.error = false;
    this.modal$.next(this.modal);
  }

  constructor(
    private router: Router,
    private storage: StorageService,
  ) {
    const userStorage = this.storage.getFromStorage(this.STORAGEKEY);
    if (userStorage) {
      const user = JSON.parse(userStorage);
      if (user.role === 'admin' || user.birthday.slice(0, 5) === this.today) {
        auth.isLoggedIn = true;
      } else {
        auth.isLoggedIn = false;
      }

      if (getFullYear(user.birthday) >= 18) {
        this.isAdult = true;
      }

      this.authQuest$.next(auth.isLoggedIn);
      this.userName = user.name;
      this.userName$.next(this.userName);

      this.isAuth = true;
      this.isAuth$.next(this.isAuth);
    }
  }
}
