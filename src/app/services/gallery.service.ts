import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { gallery, IPicture } from '../../base/gallery';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {
  private eventFilter = false;
  private toWhomFilter = false;
  private authorFilter = false;

  public eventValue = '';
  public toWhomValue = '';
  public authorValue = '';

  private gallerySource : IPicture[] = this.sortGallery();

  private galleryState = this.gallerySource;

  public galleryState$ = new BehaviorSubject<IPicture[]>(this.galleryState)

  public getById(id: number): IPicture {
    return this.galleryState.find(p => p.id === id) as IPicture
  }

  private sortGallery(): IPicture[] {
    return gallery.sort((a, b) => {
      if (a.year && b.year) {
        if (a.year > b.year) return 1;
        if (a.year == b.year) return 0;
        if (a.year <b.year) return -1;
      }
      return -1;
    }).filter(p => this.authService.isAdult ? p : p.adult ? null : p);
  }

  // public setGallery(): void {
  //   this.sortGallery();
  //   this.galleryState$.next(this.galleryState);
  // }

  public next(id: number): IPicture {
    const index = this.galleryState.findIndex(p => p.id === id);
    return index < this.galleryState.length - 1 ? this.galleryState[index + 1] : this.galleryState[0]
  }

  public prev(id: number): IPicture {
    const index = this.galleryState.findIndex(p => p.id === id);
    return index > 0 ? this.galleryState[index - 1] : this.galleryState[this.galleryState.length - 1]
  }


  public filterEvents(value: string) {
    if (value === 'Все') {
      this.eventFilter = false;
      this.eventValue = ''
    } else {
      this.eventFilter = true;
      this.eventValue = value
    }
    this.groupFilter()
  }

  public filterToWhom(value: string) {
    if (value === 'Все') {
      this.toWhomFilter = false;
      this.toWhomValue = ''
    } else {
      this.toWhomFilter = true;
      this.toWhomValue = value
    }
    this.groupFilter()
  }

  public filterAuthor(value: string) {
    if (value === 'Все') {
      this.authorFilter = false;
      this.authorValue = ''
    } else {
      this.authorFilter = true;
      this.authorValue = value
    }
    this.groupFilter()
  }

  private groupFilter(): void {
    if (!this.eventFilter && !this.toWhomFilter && !this.authorFilter) {
      this.galleryState = this.gallerySource;
      this.galleryState$.next(this.galleryState);

      this.router.navigate([], {queryParams: {}})
      return;
    }

    if (!this.eventFilter && !this.authorFilter && this.toWhomFilter) {
      if (this.toWhomValue === 'another') {
        this.galleryState = this.gallerySource.filter(p => p.toWhom ? null : p)
        this.galleryState$.next(this.galleryState);
      } else {
        this.galleryState = this.gallerySource.filter(p => p.toWhom === this.toWhomValue)
        this.galleryState$.next(this.galleryState);
      }

      this.router.navigate([], {queryParams: {toWhom: this.toWhomValue}})
      return;
    }

    if (this.eventFilter && !this.toWhomFilter && !this.authorFilter) {
      this.galleryState = this.gallerySource.filter(p => p.event === this.eventValue)
      this.galleryState$.next(this.galleryState);

      this.router.navigate([], {queryParams: {event: this.eventValue}})
      return;
    }

    if (!this.eventFilter && !this.toWhomFilter && this.authorFilter) {
      this.galleryState = this.gallerySource.filter(p => p.author === this.authorValue)
      this.galleryState$.next(this.galleryState);

      this.router.navigate([], {queryParams: {author: this.authorValue}})
      return;
    }

    if (!this.eventFilter && this.toWhomFilter && this.authorFilter) {
      this.galleryState = this.gallerySource.filter(p => p.author === this.authorValue && p.toWhom === this.toWhomValue)
      this.galleryState$.next(this.galleryState);

      this.router.navigate([], {queryParams: {toWhom: this.toWhomValue, author: this.authorValue}})
      return;
    }
    if (this.eventFilter && !this.toWhomFilter && this.authorFilter) {
      this.galleryState = this.gallerySource.filter(p => p.event === this.eventValue && p.author === this.authorValue)
      this.galleryState$.next(this.galleryState);

      this.router.navigate([], {queryParams: {event: this.eventValue, author: this.authorValue}})
      return;
    }
    if (this.eventFilter && this.toWhomFilter && !this.authorFilter) {
      this.galleryState = this.gallerySource.filter(p => p.event === this.eventValue && p.toWhom === this.toWhomValue)
      this.galleryState$.next(this.galleryState);

      this.router.navigate([], {queryParams: {event: this.eventValue, toWhom: this.toWhomValue}})
      return;
    }

    this.galleryState = this.gallerySource.filter(p => p.event === this.eventValue && p.toWhom === this.toWhomValue && p.author === this.authorValue)
    this.galleryState$.next(this.galleryState);

    this.router.navigate([], {queryParams: {event: this.eventValue, author: this.authorValue, toWhom: this.toWhomValue}})
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    }
}
