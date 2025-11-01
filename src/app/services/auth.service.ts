import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { url } from '../../../environment/url-env';
import { auth } from '../guards/auth';
import { TAuthUser, TUser, TUserReg } from '../types';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { TelegramService } from './telegram.service';

export type Modal = {
  active: boolean,
  error: boolean,
  modalText: string
}

// export type AuthState = {
//   modal: {
//     active: boolean,
//     error: boolean,
//     modalText: string
//   },
//   userName: string,
//   guards: {
//     default: boolean,
//     isAuth: boolean,
//     authQuest: boolean,
//     authNewYear: boolean
//   }
// }

export const URL = url['PROD'];

const intlDateControl = new Intl.DateTimeFormat('ru', {day: '2-digit', month: '2-digit'})
const intlDate = new Intl.DateTimeFormat('ru')

@Injectable({
  providedIn: 'root'
})


export class AuthService {
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

  private STORAGEKEY = 'sessionId';

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
    const reg$: Observable<any> = this.httpService.postHttp(`${URL}/api/user/signup`, data);
    try {
      reg$.pipe(catchError((err: any) => {
        this.modal.active = true;
        this.modal.error = true;
        this.modal.modalText = "Что-то пошло не так";
        if (err.status === 409) {
          this.modal.modalText = `Пользователь с логином ${data.login} уже существует. Попробуйте другой логин`;
        }
        if(err.status === 0) {
          this.modal.modalText = 'Нет связи с сервером'
        }

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

        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 5000)
      })
    } catch (err) {
      console.error(err)
    }
  }

  public isAuthIn(authUser: TAuthUser): void {
    const user$: Observable<{user: TUser}> = this.httpService.postHttp(`${URL}/api/user/login`, authUser);

    try {
      user$.pipe(
        catchError((err: any) => {
          this.modal.modalText = 'Не привильный логин или пароль';
          if(err.status === 0) {
            this.modal.modalText = 'Нет связи с сервером'
          }
          this.modal.active = true;
          this.modal.error = true;
          return throwError(() => err)
        }),
        tap((res: any) => {
          const sessionId = res.sessionId
          if (sessionId) {
            this.storage.saveToStorage(this.STORAGEKEY, sessionId)
          }
        }),
        map(data => data.user))
      .subscribe((user: TUser)  => {
        this.isAdminFun(user);
        auth.isLoggedIn = true;
        this.userName = user.username;
        this.userName$.next(this.userName);
        this.router.navigate(['']);
        this.isAuth$.next(true);


        if (user.username === 'Светлана Борисовна Багаутдинова' && this.todayByControl === intlDateControl.format(new Date('1986-11-01'))) {
          setTimeout(() => this.modalActive(`С Днём Рождения Любимая!!!`))
        } else if (this.todayByControl === intlDateControl.format(new Date(user.birthday))) {

          setTimeout(() => this.modalActive(`С Днём Рождения ${user.username}!!!`))
        } else if (user.role === 'admin') {
          auth.isQuestIn = true;
          this.authQuest$.next(auth.isQuestIn);
          // setTimeout(() => this.modalActive(`Сегодня вам доступна бонусная страница "Quest"`, false), 5000)
        }
        this.modalActive(`Добро пожаловать ${user.username}`, false);
      })

    } catch (err) {
      console.error(err)
    }
  }

  public isAuthOut() {

    const sessionId = this.storage.getFromStorage(this.STORAGEKEY)
    try {
      const logout = this.httpService.getHttp(`${URL}/api/user/logout`, sessionId)
      logout.pipe(
        catchError((err) => {
          this.modal.modalText = "Что-то пошло не так";
          this.modal.active = true;
          this.modal.error = true;
          return throwError(() => err)
        }),
        tap(() => {
          this.storage.removeStorage(this.STORAGEKEY)
        })
      )
      .subscribe(() => {
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
    private telegram: TelegramService,
    private storage: StorageService
  ) {
    this.isAdmin = false
    const sessionId = storage.getFromStorage(this.STORAGEKEY)
    if (sessionId) {
      try {
        const user$: Observable<{data: TUser}> = this.httpService.getHttp(`${URL}/api/user/user`, sessionId)
        user$.pipe(catchError((err: any) => {
          this.modal.modalText = 'Попробуйте войти снова';
          this.modal.active = true;
          this.modal.error = true;
          if(err.status === 0) {
            this.modal.modalText = 'Нет связи с сервером'
          }

          if (err.status === 401) {
            storage.removeStorage(this.STORAGEKEY)
          }
          return throwError(() => err)
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
