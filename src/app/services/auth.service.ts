import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { url } from '../../../environment/url-env';
import { auth } from '../guards/auth';
import { TAuthUser, TUserReg, TUser } from '../types';
import { HttpService } from './http.service';
import { TelegramService } from './telegram.service';

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

export const URL = url['DEV'];

const intlDateControl = new Intl.DateTimeFormat('ru', {day: '2-digit', month: '2-digit'})
const intlDate = new Intl.DateTimeFormat('ru')

@Injectable({
  providedIn: 'root'
})


export class AuthService implements OnInit {
  public isAdult = false;
  public isAdmin!: boolean;
  private userName = '';

  private date = new Date();
  private todayByControl = intlDateControl.format(this.date);

  private modal = {
    active: false,
    error: false,
    modalText: ''
  };

  // private STORAGEKEY = 'art-studio';

  // private authState: AuthState = {
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
  public isAdmin$ = new BehaviorSubject<boolean>(false);
  public authQuest$ = new BehaviorSubject<boolean>(auth.isQuestIn)
  public authNewYear$ = new BehaviorSubject<boolean>(auth.newYearIn)

  public signup(data: TUserReg, comment: string) {
    const reg$: Observable<any> = this.httpService.postHttp(`${URL}/api/signup`, data);
    try {
      reg$.pipe(catchError((err: any) => {
        this.modal.modalText = "Что-то пошло не так";
        this.modal.active = true;
        this.modal.error = true;
        console.log('ERROR catchError')
        return throwError(() => err)
      })).subscribe(() => {
        this.modalActive('Спасибо за регистрацию! Теперь вам доступны все возможности сервиса')

        this.telegram.setData(
          {
            name: data.username,
            birthday: data.birthday,
            comment,
          }
        )
      })
    } catch (err) {
      console.error(err)
    }
  }

  public isAuthIn(authUser: TAuthUser): void {
    const user$: Observable<{user: TUser}> = this.httpService.postHttp(`${URL}/api/login`, authUser);

    try {
      user$.pipe(catchError((error: any) => {
        let textError = 'Не привильный логин или пароль';
        if(error.status === 0) {
          textError = 'Нет связи с сервером'
        }
        this.modal.modalText = textError;
        this.modal.active = true;
        this.modal.error = true;
        return throwError(() => error)
      }), map(data => data.user))
      .subscribe((user)  => {
        this.isAdminFun(user);
        auth.isLoggedIn = true;
        this.userName = user.username;
        this.userName$.next(this.userName);
        this.router.navigate(['']);
        this.isAuth$.next(true);

        console.log(document.cookie)

        this.modalActive(`Добро пожаловать ${user.username}`, false);

        if (user.role === 'admin' || this.todayByControl === intlDateControl.format(new Date('1986-11-01'))) {
          auth.isQuestIn = true;
          this.authQuest$.next(auth.isQuestIn);
          setTimeout(() => this.modalActive(`С Днём Рождения!!!`, false), 5000)
          setTimeout(() => this.modalActive(`Сегодня вам доступна бонусная страница "Quest"`, false), 10000)
        }
      })

    // if (findUser.role === 'admin' || user.birthday.slice(0, 5) === this.today) {
    //   auth.isQuestIn = true;
    //   this.authQuest$.next(auth.isQuestIn);
    // }

    // if (findUser.role === 'admin' || this.today === '01.01' || this.today === '02.01' || this.today === '03.01' || this.today === '04.01' || this.today === '05.01' || this.today === '07.12') {
    //   auth.newYearIn = true;
    //   this.authNewYear$.next(auth.newYearIn)
    // }


    // this.storage.saveToStorage(this.STORAGEKEY, JSON.stringify(findUser));
    } catch (err) {
      console.error(err)
    }
  }

  public isAuthOut() {
    const logout = this.httpService.getHttp(`${URL}/api/logout`)

    try {
      logout.pipe(catchError((err) => {
        this.modal.modalText = "Что-то пошло не так";
        this.modal.active = true;
        this.modal.error = true;
        console.log('Error:', err)
        return throwError(() => err)
      })).subscribe((res) => {
        console.log('res', res)
        auth.isQuestIn = false;
        this.isAuth$.next(false);
        this.userName = '';
        this.userName$.next(this.userName);
        auth.isQuestIn = false;
        this.authQuest$.next(auth.isQuestIn);
        auth.newYearIn = false;
        this.authNewYear$.next(auth.newYearIn);
        location.reload();
      })
    } catch(err) {
      console.error(err)
    }
  }

  private modalActive(text: string, error: boolean = false) {
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
    private httpService: HttpService,
    private telegram: TelegramService
  ) {
    this.isAdmin = false
    console.log('before if', document.cookie.split('sessionId=')[1])
    if (document.cookie.split('sessionId=')[1]) {
      console.log('in if:', document.cookie.split('sessionId=')[1])
      const user$: Observable<{data: TUser}> = this.httpService.getHttp(`${URL}/api/user`)
      try {
        user$.pipe(catchError((error: any) => {
          this.modal.modalText = 'Что-то пошло не так';
          this.modal.active = true;
          this.modal.error = true;
          return throwError(() => error)
        }),
        map(data => data.data)).subscribe((user)  => {
          this.isAdminFun(user);
          auth.isLoggedIn = true;
          this.userName = user.username;
          this.userName$.next(this.userName);
          this.router.navigate(['']);
          this.isAuth$.next(true);

          if (user.role === 'admin' || this.todayByControl === intlDateControl.format(new Date('1986-11-01'))) {
            auth.isQuestIn = true;
            this.authQuest$.next(auth.isQuestIn);
          }
        })
      } catch (err) {
        console.error(err)
      }
    }

    // const userStorage = this.storage.getFromStorage(this.STORAGEKEY);
    // if (userStorage) {
    //   const user: User = JSON.parse(userStorage);
    //   if (user.role === 'admin' || user.birthday.slice(0, 5) === this.today) {
    //     auth.isQuestIn = true;
    //   } else {
    //     auth.isQuestIn = false;
    //   }

    //   if (user.role === 'admin'
    //      || this.today === '01.01'
    //      || this.today === '02.01'
    //      || this.today === '03.01'
    //      || this.today === '04.01'
    //      || this.today === '05.01'
    //      || this.today === '06.01'
    //      || this.today === '07.01'
    //      || this.today === '08.01'
    //      || this.today === '09.01'
    //      || this.today === '10.01') {
    //     auth.newYearIn = true;
    //     this.authNewYear$.next(auth.newYearIn)
    //   }

    //   this.isAdminFun(user);
    //   auth.isLoggedIn = true;

    //   this.authQuest$.next(auth.isQuestIn);
    //   this.userName = user.username;
    //   this.userName$.next(this.userName);

    //   this.isAuth$.next(true);
    // }
  }

  ngOnInit() {
    console.log('ngOnInit', document.cookie.split('sessionId=')[1])
  }

  private isAdminFun(user: TUser): void {
    if (user.role === 'admin') {
      this.isAdmin = true;
      this.isAdmin$.next(true)
    }
  }

  // private isAdultFun(user: User): void {
  //   if (getFullYear(user.birthday) >= 18 && user.role !== 'user') {
  //     this.isAdult = true;
  //   }
  // }

}
