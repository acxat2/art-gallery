import { Injectable } from '@angular/core';
import { TPicture } from './gallery.service';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { keys } from '../../../environment/keys-env';
import { HttpService } from './http.service';
import { URL_API } from './auth.service';
import { Router } from '@angular/router';

export type TAnotherUser = {
  id: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private anotherState: {[id: string]: TPicture[]} | null = null;

  private anotherGallerySource: TPicture[] | null = null;
  private anotherGalleryState = this.anotherGallerySource;
  private albumFilter = false;
  private userFilter = false;

  private userList: TAnotherUser[] = [];

  public anotherState$ = new BehaviorSubject<{[id: string]: TPicture[]} | null>(this.anotherState);
  public anotherGalleryState$ = new BehaviorSubject<TPicture[] | null>(this.anotherGalleryState);
  public albumValue = 'Все';
  public albums$ = new BehaviorSubject<string[]>([this.albumValue]);
  public userList$ = new BehaviorSubject<TAnotherUser[]>(this.userList);
  public user: TAnotherUser | null = null;
  public user$ = new BehaviorSubject<TAnotherUser | null>(this.user);
  public load$ = new BehaviorSubject<boolean>(false);
  public params: {user?: string, album?: string} = {}

  public getById(id: string): TPicture | null {
    return this.anotherGalleryState ? this.anotherGalleryState.find(p => p.id === id) as TPicture : null
  }

  public getUsers(): void {

    const sessionId = this.storageService.getFromStorage(keys.sessionId);
    const users = this.httpService.getHttp(`${URL_API}/image/sharing`, sessionId)
      .pipe(catchError(err => {
        return throwError(() => {
          console.error('Ошибка загрузки данных:', err);
          return err;
        })
      }))
      .subscribe((res: any) => {
        const users = res.data as TAnotherUser[];
        if (!users) return;
        this.userList = users;
        this.userList$.next(this.userList)
        this.load$.next(false)

      })

      setTimeout(() => users.unsubscribe(), 15000)
  }

  public sortGallery(): void {
    function sortG(g: TPicture[]) {
      return g.sort((a, b) => {
        if (a.year && b.year) {
          if (a.year > b.year) return -1;
          if (a.year == b.year) return 0;
          if (a.year < b.year) return 1;
        }
        return -1;
      })
    }

    const sessionId = this.storageService.getFromStorage(keys.sessionId);
    if (!this.user) {
      return
    }

    if (this.anotherState && this.anotherState[this.user.id]) {
      this.anotherGallerySource = this.anotherGalleryState = this.anotherState[this.user.id];
      const albums = ["Все", ...new Set(this.anotherGalleryState.map((i: TPicture) => i.album))] as string[];
      this.albums$.next(albums)
      this.anotherGalleryState$.next(this.anotherGalleryState)
      return
    }

    this.load$.next(true);
    const galleryInit = this.httpService.getHttp(`${URL_API}/image/sharing/${this.user.id}`, sessionId)
    .pipe(catchError(err => {
      return throwError(() => {
        console.error('Ошибка загрузки данных:', err);
        return err;
      })
    }))
    .subscribe((res: any) => {
      const albums = ["Все", ...new Set(res.data.map((i: TPicture) => i.album))] as string[];
      this.albums$.next(albums)
      this.load$.next(false);
      if (this.anotherState === null) this.anotherState = {};
      if (!this.user) return

      this.anotherGallerySource = this.anotherGalleryState = this.anotherState[this.user.id] = sortG(res.data);

      this.groupFilter()
    })

    setTimeout(() => {
      galleryInit.unsubscribe()
    }, 30000)
  }

  public next(id: string): TPicture | void {
    if (!this.anotherGalleryState) {
      return
    }
    const index = this.anotherGalleryState.findIndex(p => p.id === id);
    return index < this.anotherGalleryState.length - 1 ? this.anotherGalleryState[index + 1] : this.anotherGalleryState[0]
  }

  public prev(id: string): TPicture | void {
    if (!this.anotherGalleryState) {
      return
    }
    const index = this.anotherGalleryState.findIndex(p => p.id === id);
    return index > 0 ? this.anotherGalleryState[index - 1] : this.anotherGalleryState[this.anotherGalleryState.length - 1]
  }

  public filterAlbums(value: string) {
    if (value === 'Все' || value === '') {
      this.albumFilter = false;
      this.albumValue = 'Все'
    } else {
      this.albumFilter = true;
      this.albumValue = value

    }
    this.params.album = value
    this.router.navigate([], {queryParams: this.params})
    this.groupFilter()
  }

  public filterUsers(value: string, album = 'Все') {
    this.load$.next(true);
    const findUser = this.userList.find(user => user.id === value);

    if (!findUser) return;

    this.userFilter = true;
    this.user = findUser;
    this.albumValue = album;
    this.params.user = this.user.id

    this.user$.next(this.user);
    this.load$.next(false);
    this.filterAlbums(this.albumValue)
    this.sortGallery();
  }

  private groupFilter(): void {
    if (!this.anotherGallerySource) {
      return
    }

    if (this.userFilter && this.user) {
      this.params.user = this.user.id
    }

    if (this.albumFilter) {
      this.params.album = this.albumValue
      this.anotherGalleryState = this.anotherGallerySource.filter(p => p.album === this.albumValue)
      this.anotherGalleryState$.next(this.anotherGalleryState);

      this.router.navigate([], {queryParams: this.params})
      return;
    }

    this.getGalleryDefault()
  }

  public getGalleryDefault() {
    this.albumValue = "Все"
    this.anotherGalleryState = this.anotherGallerySource;
    this.anotherGalleryState$.next(this.anotherGalleryState);
  }

  public getPicturesByParams(queryParams: {[key: string]: string}) {
    if (queryParams['user']) {
      this.userList$.subscribe(res => {

        if (res.length) {
          this.filterUsers(queryParams['user'], queryParams['album'])
        }
      })

    }
  }

  constructor(
    private storageService: StorageService,
    private httpService: HttpService,
    private router: Router,
  ) {
    if (!storageService.getFromStorage(keys.sessionId)) {
      this.anotherGallerySource = this.anotherGalleryState = [];
      this.anotherGalleryState$.next(this.anotherGalleryState)
      this.router.navigate(['home'])
    }

    this.load$.next(true);
    this.getUsers();
  }
}
