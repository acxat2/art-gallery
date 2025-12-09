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

export type TAnotherPicture = Omit<TPicture, 'mod' | 'sharing'>

@Injectable({
  providedIn: 'root'
})
export class AnotherService {
  private userList: TAnotherUser[] = [];
  private anotherState: {[id: string]: TAnotherPicture[]} | null = null;
  private newPublic: TAnotherPicture[] = [];

  private anotherGallerySource: TAnotherPicture[] | null = null;
  private anotherGalleryState = this.anotherGallerySource;
  private albumFilter = false;
  private userFilter = false;


  public anotherState$ = new BehaviorSubject<{[id: string]: TAnotherPicture[]} | null>(this.anotherState);
  public newPublic$ = new BehaviorSubject<TAnotherPicture[] | null>(this.newPublic);
  public anotherGalleryState$ = new BehaviorSubject<TAnotherPicture[] | null>(this.anotherGalleryState);
  public albumValue = 'Все';
  public albums$ = new BehaviorSubject<string[]>([this.albumValue]);
  public userList$ = new BehaviorSubject<TAnotherUser[]>(this.userList);
  public user: TAnotherUser | null = null;
  public user$ = new BehaviorSubject<TAnotherUser | null>(this.user);
  public load$ = new BehaviorSubject<boolean>(false);
  public params: {user?: string, album?: string} = {}

  public getById(id: string): TAnotherPicture | null {
    return this.anotherGalleryState ? this.anotherGalleryState.find(p => p.id === id) as TAnotherPicture : null
  }

  public getPictureByParams(userId: string, album: string) {
    const userIdParam: string = userId.replace('user', '');

    const picture = this.userList$.subscribe((res) => {
      if (res.length) {

        this.filterUsers(userIdParam, album, false)
        picture.unsubscribe()
      }
    })
  }

  public getNewPictureById(id: string): TAnotherPicture | null {
    return this.newPublic ? this.newPublic.find(p => p.id === id) as TAnotherPicture : null
  }

  public getUsers(): void {
    const sessionId = this.storageService.getFromStorage(keys.sessionId);
    const users = this.httpService.getHttp(`${URL_API}/image/users`, sessionId)
      .pipe(catchError(err => {
        return throwError(() => {
          console.error('Ошибка загрузки данных:', err);
          return err;
        })
      }))
      .subscribe((res: any) => {
        const users = res.data.users;

        if (!users) return;

        this.userList = users;
        this.userList$.next(this.userList)

        if (res.data.images) {
          this.anotherState = res.data.images;
          this.anotherState$.next(this.anotherState)
        }

        if (res.data.newPublic) {
          this.newPublic = res.data.newPublic;
          this.newPublic$.next(this.newPublic)
        }
        this.load$.next(false)
      })

    setTimeout(() => users.unsubscribe(), 15000)
  }

  public sortGallery(): void {
    function sortG(g: TAnotherPicture[]) {
      return g.sort((a, b) => {
        if (a.year && b.year) {
          if (a.year > b.year) return -1;
          if (a.year == b.year) {
            if (a.createdDate < b.createdDate) return 1;
            if (a.createdDate > b.createdDate) return -1;
          };
          if (a.year < b.year) return 1;
        }
        return -1;
      })
    }

    // const sessionId = this.storageService.getFromStorage(keys.sessionId);
    if (!this.user) {
      return
    }

    this.load$.next(true);

    const constState = this.anotherState$.subscribe((state) => {
      if (state && this.user) {
        const albums = ["Все", ...new Set(state[this.user.id].map((i: TAnotherPicture) => i.album))] as string[];
        this.albums$.next(albums);
        this.load$.next(false);
        if (this.anotherState === null) this.anotherState = {};
        if (!this.user) return;

        this.anotherGallerySource = this.anotherGalleryState = this.anotherState[this.user.id] = sortG(this.anotherState[this.user.id]);
        this.groupFilter();
        setTimeout(() => constState.unsubscribe(), 1000)
      }
    })

    // const galleryInit = this.httpService.getHttp(`${URL_API}/image/${this.user.id}`, sessionId)
    // .pipe(catchError(err => {
    //   return throwError(() => {
    //     console.error('Ошибка загрузки данных:', err);
    //     return err;
    //   })
    // }))
    // .subscribe((res: any) => {
    //   const albums = ["Все", ...new Set(res.data.map((i: TAnotherPicture) => i.album))] as string[];
    //   this.albums$.next(albums)
    //   this.load$.next(false);
    //   if (this.anotherState === null) this.anotherState = {};
    //   if (!this.user) return

    //   this.anotherGallerySource = this.anotherGalleryState = this.anotherState[this.user.id] = sortG(res.data);

    //   this.groupFilter()
    // })

    // setTimeout(() => {
    //   galleryInit.unsubscribe()
    // }, 30000)
  }

  public next(id: string): TAnotherPicture | void {
    if (!this.anotherGalleryState) {
      return
    }
    const index = this.anotherGalleryState.findIndex(p => p.id === id);
    return index < this.anotherGalleryState.length - 1 ? this.anotherGalleryState[index + 1] : this.anotherGalleryState[0]
  }

  public prev(id: string): TAnotherPicture | void {
    if (!this.anotherGalleryState) {
      return
    }
    const index = this.anotherGalleryState.findIndex(p => p.id === id);
    return index > 0 ? this.anotherGalleryState[index - 1] : this.anotherGalleryState[this.anotherGalleryState.length - 1]
  }

  public newNext(id: string): TAnotherPicture | void {
    if (!this.newPublic) {
      return
    }
    const index = this.newPublic.findIndex(p => p.id === id);
    return index < this.newPublic.length - 1 ? this.newPublic[index + 1] : this.newPublic[0]
  }

  public newPrev(id: string): TAnotherPicture | void {
    if (!this.newPublic) {
      return
    }
    const index = this.newPublic.findIndex(p => p.id === id);
    return index > 0 ? this.newPublic[index - 1] : this.newPublic[this.newPublic.length - 1]
  }

  public filterAlbums(value: string, params = true) {
    if (value === 'Все') {
      this.albumFilter = false;
      this.albumValue = 'Все'
      delete this.params.album
    } else {
      this.albumFilter = true;
      this.albumValue = value
      this.params.album = value
    }
    if (params) {
      this.router.navigate([], {queryParams: this.params})
    }
    this.groupFilter()
  }

  public filterUsers(userId: string, album = 'Все', params = true) {
    this.load$.next(true);

    const findUser = this.userList.find(user => user.id === userId);

    if (!findUser) return;

    this.userFilter = true;
    this.user = findUser;
    this.params.user = this.user.id

    this.user$.next(this.user);
    this.load$.next(false);
    this.filterAlbums(album, params)
    this.sortGallery();
  }

  private groupFilter(): void {
    if (!this.anotherGallerySource) {
      return
    }

    // if (this.userFilter && this.user) {
    //   this.params.user = this.user.id
    // }

    if (this.albumFilter) {
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
      const userList = this.userList$.subscribe(res => {
        if (res.length) {
          this.filterUsers(queryParams['user'], queryParams['album']);
          userList.unsubscribe()
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
      return
    }

    this.load$.next(true);
    this.getUsers();
  }
}
