import { CommonModule, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AuthService, Modal } from '../../services/auth.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, ModalComponent, ClickOutsideDirective, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private default$: Observable<boolean> = this.authService.default$;
  private authQuest$: Observable<boolean> = this.authService.authQuest$
  private authNewYear$: Observable<boolean> = this.authService.authNewYear$
  public userIn$: Observable<boolean> = this.authService.isAuth$;
  public isAdmin$: Observable<boolean> = this.authService.isAdmin$;
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
    {linkName: 'Моё', routerLink: 'gallery', isLoggedIn: this.userIn$},
    {linkName: 'Галерея', routerLink: 'another', isLoggedIn: this.userIn$},
    {linkName: 'Заявки', routerLink: 'sharing', isLoggedIn: this.isAdmin$},
    // {linkName: 'Музыка', routerLink: 'music', isLoggedIn: this.userIn$},
    // {linkName: 'Литература', routerLink: 'literature', isLoggedIn: this.userIn$},
    // {linkName: 'image', routerLink: 'image-upload', isLoggedIn: this.userIn$},
    // {linkName: 'Birthday', routerLink: 'quest', isLoggedIn: this.authQuest$},
    // {linkName: 'NewYear', routerLink: 'newyear', isLoggedIn: this.authNewYear$}
    // {linkName: 'Клендарь', routerLink: 'calendar', isLoggedIn: this.default$},
    // {linkName: 'Контакты', routerLink: 'contacts', isLoggedIn: this.default$},
  ]

  public enter() {
    location.replace('/login')
  }

  public signup() {
    location.replace('/registration')
  }

  public closeModal() {
    this.authService.modalClose();
    this.confirm = false;
  }

  public confirmOut(event: boolean) {
    if (event === true) {
      this.authService.isAuthOut()
    }
    this.confirm = false;
  }

  constructor(
    private authService: AuthService,
  ) {

  }
}
