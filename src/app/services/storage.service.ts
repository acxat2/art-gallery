import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { IProductInCart } from '../blocks/cart/store/reducers';

// const storageKey = 'cartNgrxProduct'

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  public saveToStorage(key: string, data: string): void {
    localStorage.setItem(key, data)
  }

  public getFromStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  public clearStorage(): void {
    localStorage.clear();
  }

//  NgRx

  // public saveToStorageNgrx(data: string): void {
  //   localStorage.setItem(storageKey, data)
  // }

  // public getFromStorageNgrx(): string | null {
  //   return localStorage.getItem(storageKey);
  // }



  // public getFromStorage$(key: string): Observable<IProductInCart[] | []> {
  //   const storage = localStorage.getItem(key);
  //   const products = storage ? JSON.parse(storage) : [];
  //   return of(products);
  // }
}
