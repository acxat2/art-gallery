import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { VideoComponent } from "./components/video/video.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UpperCasePipe,
    HeaderComponent,
    VideoComponent,
    FooterComponent,
    CommonModule
  ],
  template: `
      <app-header/>
      <main class="container">
        <router-outlet/>
        @if(visible | async) {
          <button class="back" (click)="scroll()">Наверх</button>
        }
      </main>
      <!-- <app-footer></app-footer> -->
    `,
  styles: `
    .back {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 30px;
      background-color: rgba(200, 200, 200, 0.4);
      border: none;
      opacity: 0.7;
      cursor: pointer;
      transition: opacity ease-in-out 0.15s, background-color ease-in-out 0.15s;
    }

    .back:hover {
      opacity: 1;
      background-color: rgba(150, 150, 150, 0.5);
    }
  `
})
export class AppComponent {
  public visible = new BehaviorSubject(false)

  public scroll() {
    window.scrollTo(0, 0)
  }
  constructor() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        this.visible.next(true)
      } else {
        this.visible.next(false)
      }
    })
  }
}
