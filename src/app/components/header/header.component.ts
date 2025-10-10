import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AuthService, Modal } from '../../services/auth.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, ModalComponent, ClickOutsideDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private default$: Observable<boolean> = this.authService.default$;
  private authQuest$: Observable<boolean> = this.authService.authQuest$
  private authNewYear$: Observable<boolean> = this.authService.authNewYear$
  public userIn$: Observable<boolean> = this.authService.isAuth$;
  public name$: Observable<string> = this.authService.userName$;
  public modal$: BehaviorSubject<Modal> = this.authService.modal$;
  public navIsOpen = false;
  public confirm = false;

  public toggleMenu() {
    this.navIsOpen = !this.navIsOpen;
  }

  public openMenu() {
    this.navIsOpen = true;
  }

  public closeMenu() {
    this.navIsOpen = false;
  }

  public navMenu = [
    // {linkName: 'Творчество', routerLink: '#', isLoggedIn: this.default$},
    {linkName: 'Галерея', routerLink: 'gallery', isLoggedIn: this.default$},
    {linkName: 'Музыка', routerLink: 'music', isLoggedIn: this.userIn$},
    {linkName: 'Литература', routerLink: 'literature', isLoggedIn: this.userIn$},
    // {linkName: 'Игры', routerLink: '#', isLoggedIn: this.default$},
    {linkName: 'Birthday', routerLink: 'quest', isLoggedIn: this.authQuest$},
    {linkName: 'NewYear', routerLink: 'newyear', isLoggedIn: this.authNewYear$}
    // {linkName: 'Клендарь', routerLink: 'calendar', isLoggedIn: this.default$},
    // {linkName: 'Контакты', routerLink: 'contacts', isLoggedIn: this.default$},
  ]

  public enter() {
    location.replace('/login')
  }

  public outAuth() {
    // this.modal$.next(({active: true, error: false, modalText: 'Вы уверены?'}))
    // if (confirm('Вы уверены?')) {
    //   this.authService.isAuthOut()
    // }
    this.confirm = true;
  }

  public closeModal() {
    this.authService.modalClose();
    this.confirm = false;
  }

  public confirmOut(event: boolean) {
    if (event === true) {
      this.authService.isAuthOut()
      console.log('isAuthOut')
    }
    this.confirm = false;
  }

  constructor(
    private authService: AuthService,
  ) {

  }
}

// private telegram: TelegramService

// this.telegram.setData({
//   name: 'Асхст',
//   birthday: '12.12.2012',
//   comment: 'Hello world!'
// })
