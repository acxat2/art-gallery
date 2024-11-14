import { Injectable } from '@angular/core';
import { gallery, IPicture } from '../../base/gallery';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {
  public pictures: IPicture[] = gallery;

  public sort$(): Observable<IPicture[]> {
    return of(this.pictures.sort((a, b) => {
      if (a.year && b.year && a.year > b.year) return 1;
      if (a.year && b.year && a.year == b.year) return 0;
      if (a.year && b.year && a.year <b.year) return -1;
      return 1;
    }))
  };

  public getById(id: number): Observable<IPicture | undefined> {
    return of(this.pictures.find(item => item.id === id))
  }

  constructor() { }
}
