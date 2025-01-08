import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {

  private db!: IDBDatabase;

  public createDB(nameDB: string, nameStore: string, keyPath: string = 'id') {
    const request = indexedDB.open(nameDB, 1);

    request.onerror = function(event) {
      console.error('Проблема с открытием базы данных: ', event);
    };

    request.onupgradeneeded = () => {
      this.db = request.result;
      const objectStore = this.db.createObjectStore(nameStore, {keyPath, autoIncrement: true})
      objectStore.createIndex
    }
  }

  constructor() { }
}
