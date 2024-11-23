import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, Modal } from '../../services/auth.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, ModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private default$: Observable<boolean> = this.authService.default$;
  public userIn$: Observable<boolean> = this.authService.isAuth$;
  private authQuest$: Observable<boolean> = this.authService.authQuest$
  public name$: Observable<string> = this.authService.userName$;
  public modal$: Observable<Modal> = this.authService.modal$;


  @Input() public navMenu = [
    {linkName: 'Рисунки', routerLink: 'gallery', isLoggedIn: this.default$},
    {linkName: 'Музыка', routerLink: 'music', isLoggedIn: this.userIn$},
    // {linkName: 'Клендарь', routerLink: 'calendar', isLoggedIn: this.default$},
    // {linkName: 'Контакты', routerLink: 'contacts', isLoggedIn: this.default$},
    {linkName: 'QUEST', routerLink: 'quest', isLoggedIn: this.authQuest$}
  ]

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
