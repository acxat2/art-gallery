import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ModalComponent } from '../../components/modal/modal.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AuthService } from '../../services/auth.service';
import { TUserReg } from '../../types';

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
    ClickOutsideDirective,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  public text = '';
  public modal = false;
  public error = true;
  public btnDisabled!: boolean;


  public checkForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.pattern('[a-zA-ZА-ЯЁа-яё ]{1,50}')
    ]],

    birthday: ['', [
      Validators.required,
      Validators.pattern('[0-9]{4}\-[0-9]{2}\-[0-9]{2}')
    ]],

    login: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+([-_]?[a-zA-Z0-9]+){0,2}$/)
    ]],

    password: ['', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9-\_]{4,16}')
      // Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{4,16}')
    ]],

    passwordControl: ['', [
      Validators.required,
    ]],

    textarea: ['', [
      Validators.required,
      Validators.minLength(5)
    ]]
  })

  get fNameControl() {
    return this.checkForm.get('name');
  }

  get fBirthdayControl() {
    return this.checkForm.get('birthday');
  }

  get fLoginControl() {
    return this.checkForm.get('login');
  }

  get fPasswordControl() {
    return this.checkForm.get('password');
  }

  get fPasswordRepeatControl() {
    return this.checkForm.get('passwordControl');
  }

  get fTextareaControl() {
    return this.checkForm.get('textarea');
  }

  public onInput(e: Event) {
    const input = (e.target as HTMLInputElement).value.replace(/[^a-zA-Z0-9-_]/, '');
    this.checkForm.get('login')?.setValue(input, {emitEvent: false})
  }


  public async sendForm() {
    const now = new Date().getFullYear()

    if (this.checkForm.status != "INVALID") {
      const name = this.checkForm.get('name')?.value.trim();
      const birthday = this.checkForm.get('birthday')?.value.trim();
      const login = this.checkForm.get('login')?.value.trim().toLowerCase();
      const password = this.checkForm.get('password')?.value.trim();
      const passwordRepeat = this.checkForm.get('passwordControl')?.value.trim();
      const comment = this.checkForm.get('textarea')?.value.trim();

      const year = birthday.slice(0, 4);
      if (now - year <= 5) {
        this.text ='Не слишком ли молоды для регистрации?';
        this.modal = true;
        return;
      }

      if (now - year > 110) {
        this.text ='Столько не живут';
        this.modal = true;
        return;
      }

      if (password !== passwordRepeat) {
        this.text ='Повторите пароль ещё раз';
        this.modal = true;
        this.checkForm.get('passwordControl')?.setValue('');
        return;
      }

      const data: TUserReg = {
        username: name,
        birthday,
        login,
        password
      }

      if (this.checkForm.status === "VALID") {
        this.authService.signup(data, comment);
      } else {
        this.modal = true
      }

    } else {
      this.text ='Поля не корректно или не все заполнены';
      this.modal = true;
    }
  }

  public closeModal() {
    this.modal = false
  }

  constructor(
    // private telegram: TelegramService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService

  ) {

    const reg = localStorage.getItem('reg');
    const time = reg ? (+reg + 3600000) - Date.now() : 0;
    this.btnDisabled = true;

    if (reg && time > 0) {
      this.text ='Повторную заявку можно будет подать через ' + Math.round(time/1000) + 'с';
      this.modal = true;
      setTimeout(() => {
        this.btnDisabled = false;
        this.modal = false;
      }, time)
    } else {
      this.btnDisabled = false;
    }
  }

}
