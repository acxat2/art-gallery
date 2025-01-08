import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { VideoComponent } from "./components/video/video.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BehaviorSubject } from 'rxjs';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UpperCasePipe,
    HeaderComponent,
    VideoComponent,
    FooterComponent,
    CommonModule,
  ],
  template: `
      <app-header/>
      <main class="container">
        <router-outlet/>
      </main>
      @if(visible | async) {
          <button class="back" (click)="scroll()">Наверх</button>
      }
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





    // let db;
    // const request = indexedDB.open("NotesDB", 1);

    // request.onerror = function(event) {
    //   console.log("Проблема с открытием базы данных:", event);
    // };

    // request.onupgradeneeded = function(event) {
    //   db = request.result;
    //   const objectStore = db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
    //   objectStore.createIndex("title", "title", { unique: false });
    //   console.log("База данных и хранилище объектов созданы.");
    // };

    // request.onsuccess = function(event) {
    //   db = request.result;
    //   console.log("База данных успешно открыта.");
    // };


    // function addNote(title: string, content: string) {
    //   const transaction = db!.transaction("notes", "readwrite");
    //   const objectStore = transaction.objectStore("notes");
    //   const request = objectStore.add({ title: title, content: content });

    //   request.onsuccess = function(event: any) {
    //     console.log("Заметка добавлена в базу данных.");
    //   };

    //   request.onerror = function(event: any) {
    //     console.log("Ошибка при добавлении заметки:", event);
    //   };
    // }


    // setTimeout(() => {
    //   addNote('title5', 'Welcome friends')
    //   addNote('title6', 'Welcome friends1')
    //   addNote('title7', 'Welcome friends2')
    //   addNote('title8', 'Welcome friends3')
    //   addNote('title9', 'Welcome friends4')
    // }, 1000)

    // setTimeout(() => {
    //   console.log(indexedDB.databases())
    // },2000)



    // indexedDB.databases().then((res) => {
    //   console.log(res)
    // })
  }
}
