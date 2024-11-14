import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
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
  @Input() public navMenu = [
    // {linkName: 'Главная', routerLink: 'home'},
    {linkName: 'Галерея', routerLink: 'gallery'},
    // {linkName: 'Клендарь', routerLink: 'calendar'},
    // {linkName: 'Контакты', routerLink: 'contacts'},
  ]

  public userIn$: Observable<boolean> = this.authService.isAuth$;
  public name$: Observable<string> = this.authService.userName$;
  public modal$: Observable<Modal> = this.authService.modal$;

  public authQuest = this.authService.authQuest$

  public enter() {
    location.replace('/login')
  }

  public output() {
    if (confirm('Вы уверены?')) {
      this.authService.isAuthOut()
    }
  }

  public closeModal() {
    this.authService.modalClose()
  }

  constructor(
    private authService: AuthService,
  ) {
  }
}
