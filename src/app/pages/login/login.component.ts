import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ModalComponent } from '../../components/modal/modal.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    InputMaskModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ModalComponent,
    RouterModule,
    ClickOutsideDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public modal = false;
  private loginPattern = /^[a-zA-Z]+([-_]?[a-zA-Z0-9]+){0,2}$/i;

  public checkForm: FormGroup = this.fb.group({
    login: ['', [
      Validators.required,
      Validators.pattern(this.loginPattern)
    ]],

    password: ['', [
      Validators.required,
    ]]
  })

  get fLoginControl() {
    return this.checkForm.get('login');
  }

  get fPasswordControl() {
    return this.checkForm.get('password');
  }

  public onInput(e: Event) {
    const input = (e.target as HTMLInputElement).value.replace(/[^a-zA-Z0-9-_]/, '');
    this.checkForm.get('login')?.setValue(input, {emitEvent: false})
  }

  public sendForm() {
    if (!this.fLoginControl?.errors && !this.fPasswordControl?.errors) {
      this.authService.isAuthIn(
        {
          login: this.checkForm.get('login')?.value.trim().toLowerCase(),
          password: this.checkForm.get('password')?.value.trim()
        }
      )
    } else {
      this.modal = true
    }
  }

  public closeModal() {
    this.modal = false
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}
}
