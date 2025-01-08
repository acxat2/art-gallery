import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {


  public count = 0;

  // public count$ = new BehaviorSubject(this.count);

  public start(num: number) {
    this.count = num;
    // this.count$.next(this.count);
    const counter = setInterval(() => {
      this.count--;
      // this.count$.next(this.count);
    }, 1000);

    // this.count$.subscribe((num) => {
      if (num <= 0) {
      }
      // })

    setTimeout(() => {
      clearInterval(counter)
      // this.count$.unsubscribe()
    }, num * 1000)
  }

  public end() {
    this.count = 0
  }

  constructor() { }
}
