import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ModalComponent } from '../../components/modal/modal.component';
import { NgErrorComponent } from "../../components/ng-error/ng-error.component";
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { TelegramService } from '../../services/telegram.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    InputMaskModule,
    NgErrorComponent,
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
      Validators.pattern("[A-ZА-Я][a-zа-я]*")
    ]],

    birthday: ['', [
      Validators.required,
      Validators.pattern('[0-9]{4}\-[0-9]{2}\-[0-9]{2}')
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

  get fTextareaControl() {
    return this.checkForm.get('textarea');
  }

  public sendForm() {
    const now = new Date().getFullYear()
    if (!this.fNameControl?.errors && !this.fBirthdayControl?.errors && !this.fTextareaControl?.errors) {
      const year = this.checkForm.get('birthday')?.value.slice(0, 4);
      if (now - year <= 5) {
        this.text ='Не слишком ли молоды для регистрации?';
        this.modal = true;
        return
      }

      if (now - year > 110) {
        this.text ='Столько не живут';
        this.modal = true;
        return
      }

      this.telegram.setData(
        {
          name: this.checkForm.get('name')?.value,
          birthday: this.checkForm.get('birthday')?.value,
          comment: this.checkForm.get('textarea')?.value
      })
      this.btnDisabled = true;
      this.text ='Спасибо за регистрацию! В ближайшее время мы добавим вас в список пользователей.';
      this.modal = true;
      this.error = false;

      setTimeout(() => {
        this.router.navigate(['/gallery'])
      }, 5000)

      localStorage.setItem('reg', `${Date.now()}`)
    } else {
      this.text ='Не все поля заполнены';
      this.modal = true;
    }

  }

  public closeModal() {
    this.modal = false
  }

  constructor(
    private telegram: TelegramService,
    private fb: FormBuilder,
    private router: Router

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
