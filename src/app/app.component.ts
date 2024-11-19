import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { VideoComponent } from "./components/video/video.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UpperCasePipe,
    HeaderComponent,
    VideoComponent,
    FooterComponent,
  ],
  template: `
      <app-header/>
      <main class="container">
        <router-outlet/>
      </main>
      <!-- <app-footer></app-footer> -->
    `,
  styles: ``
})
export class AppComponent {
  constructor() {
  }
}
