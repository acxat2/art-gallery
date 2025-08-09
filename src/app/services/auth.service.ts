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

export type AuthState = {
  modal: {
    active: boolean,
    error: boolean,
    modalText: string
  },
  userName: string,
  guards: {
    default: boolean,
    isAuth: boolean,
    authQuest: boolean,
    authNewYear: boolean
  }

}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // public isAdult = false;
  public isAdmin = false;
  private userName = '';

  private date = new Date();
  private today = `${this.date.getDate() > 9 ? this.date.getDate() : '0' + this.date.getDate()}.${this.date.getMonth() + 1}`


  private modal = {
    active: false,
    error: false,
    modalText: ''
  };
  private STORAGEKEY = 'art-studio';

  // private authState = {
  //   modal: {
  //     active: false,
  //     error: false,
  //     modalText: ''
  //   },
  //   userName: '',
  //   guards: {
  //     default: true,
  //     isAuth: false,
  //     authQuest: auth.isQuestIn,
  //     authNewYear: auth.newYearIn
  //   }
  // }

  // public authState$ = new BehaviorSubject<AuthState>(this.authState)

  public modal$ = new BehaviorSubject<Modal>(this.modal);
  public userName$ = new BehaviorSubject<string>(this.userName);
  public default$ = new BehaviorSubject<boolean>(true);
  public isAuth$ = new BehaviorSubject<boolean>(false);
  public authQuest$ = new BehaviorSubject<boolean>(auth.isQuestIn)
  public authNewYear$ = new BehaviorSubject<boolean>(auth.newYearIn)

  public isAuthIn(user: User): void {
    let findUser!:User;
    users.forEach(us => {
      if (us.name.trim() === user.name && us.birthday.trim() === user.birthday) {
        findUser = us
      }
    });

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

    this.isAdminFun(findUser);

    if (findUser.role === 'admin' || user.birthday.slice(0, 5) === this.today) {
      auth.isQuestIn = true;
      this.authQuest$.next(auth.isQuestIn);
    }

    if (findUser.role === 'admin' || this.today === '01.01' || this.today === '02.01' || this.today === '03.01' || this.today === '04.01' || this.today === '05.01' || this.today === '07.12') {
      auth.newYearIn = true;
      this.authNewYear$.next(auth.newYearIn)
    }

    auth.isLoggedIn = true;
    this.userName = user.name;
    this.userName$.next(this.userName);
    this.router.navigate(['']);
    this.isAuth$.next(true);

    this.storage.saveToStorage(this.STORAGEKEY, JSON.stringify(findUser));
    this.modalActive(`Добро пожаловать ${findUser.name}`, false);

  }

  public isAuthOut() {
    auth.isQuestIn = false;
    this.isAuth$.next(false);
    this.userName = '';
    this.userName$.next(this.userName);
    auth.isQuestIn = false;
    this.authQuest$.next(auth.isQuestIn);
    auth.newYearIn = false;
    this.authNewYear$.next(auth.newYearIn);

    this.storage.saveToStorage(this.STORAGEKEY, '');
    location.reload();
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
      const user: User = JSON.parse(userStorage);
      if (user.role === 'admin' || user.birthday.slice(0, 5) === this.today) {
        auth.isQuestIn = true;
      } else {
        auth.isQuestIn = false;
      }

      if (user.role === 'admin'
         || this.today === '01.01'
         || this.today === '02.01'
         || this.today === '03.01'
         || this.today === '04.01'
         || this.today === '05.01'
         || this.today === '06.01'
         || this.today === '07.01'
         || this.today === '08.01'
         || this.today === '09.01'
         || this.today === '10.01') {
        auth.newYearIn = true;
        this.authNewYear$.next(auth.newYearIn)
      }

      this.isAdminFun(user);
      auth.isLoggedIn = true;

      this.authQuest$.next(auth.isQuestIn);
      this.userName = user.name;
      this.userName$.next(this.userName);

      this.isAuth$.next(true);
    }
  }

  private isAdminFun(user: User): void {
    if (user.role === 'admin') {
      this.isAdmin = true;
    }
  }

  // private isAdultFun(user: User): void {
  //   if (getFullYear(user.birthday) >= 18 && user.role !== 'user') {
  //     this.isAdult = true;
  //   }
  // }

}
