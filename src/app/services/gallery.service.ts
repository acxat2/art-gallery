import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { keys } from '../../../environment/keys-env';
import { AuthService, URL_API } from './auth.service';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

export type TPicture = {
  id: string;
  userId: string,
  title: string,
  fileName: string;
  description: string;
  album: string;
  year: string;
  mod: boolean;
  sharing: boolean;
  createdDate: string
}

@Injectable({
  providedIn: 'root'
})

export class GalleryService {
  private gallerySource: TPicture[] | null = null;
  private galleryState = this.gallerySource;
  private albumFilter = false;

  public galleryState$ = new BehaviorSubject<TPicture[] | null>(this.galleryState);
  public albumValue = 'Все';
  public albumValue$ = new BehaviorSubject<string | undefined>(this.albumValue);
  public albums$ = new BehaviorSubject<string[]>([this.albumValue]);

  public getById(id: string): TPicture | null {
    return this.galleryState ? this.galleryState.find(p => p.id === id) as TPicture : null
  }

  public sortGallery(): void {
    function sortG(g: TPicture[]) {
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

    const sessionId = this.storageService.getFromStorage(keys.sessionId)

    const galleryInit = this.httpService.getHttp(`${URL_API}/image`, sessionId)
    .pipe(catchError(err => {
      return throwError(() => {
        console.error('Ошибка загрузки данных:', err);
        return err;
      })
    }))
    .subscribe((res: any) => {
      const albums = ["Все", ...new Set(res.data.map((i: TPicture) => i.album))] as string[];
      this.albums$.next(albums)
      this.gallerySource = this.galleryState = sortG(res.data);

      this.groupFilter()
    })

    setTimeout(() => {
      galleryInit.unsubscribe()
    }, 30000)
  }

  public getGalleryDefault() {
    this.albumValue = "Все"
    this.galleryState = this.gallerySource;
    this.galleryState$.next(this.galleryState);
  }

  public next(id: string): TPicture | void {
    if (!this.galleryState) {
      return
    }
    const index = this.galleryState.findIndex(p => p.id === id);
    return index < this.galleryState.length - 1 ? this.galleryState[index + 1] : this.galleryState[0]
  }

  public prev(id: string): TPicture | void {
    if (!this.galleryState) {
      return
    }
    const index = this.galleryState.findIndex(p => p.id === id);
    return index > 0 ? this.galleryState[index - 1] : this.galleryState[this.galleryState.length - 1]
  }

  public filterAlbums(value: string) {
    if (value === 'Все' || value === '') {
      this.albumFilter = false;
      this.albumValue = 'Все'
    } else {
      this.albumFilter = true;
      this.albumValue = value
    }
    this.router.navigate([], {queryParams: {album: this.albumValue}})
    this.groupFilter()
  }

  private groupFilter(): void {
    if (!this.gallerySource) {
      return
    }

    if (this.albumFilter) {
      this.galleryState = this.gallerySource.filter(p => p.album === this.albumValue)
      this.galleryState$.next(this.galleryState);

      return;
    }
    this.getGalleryDefault()
  }

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {

    if (!storageService.getFromStorage(keys.sessionId)) {
      this.gallerySource = this.galleryState = [];
      this.galleryState$.next(this.gallerySource)
      this.router.navigate(['home'])
    }
    this.sortGallery()
    }
}
