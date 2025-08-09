import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgErrorComponent } from "../../components/ng-error/ng-error.component";
import { AuthService } from '../../services/auth.service';
import { InputMaskModule } from 'primeng/inputmask'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { ModalComponent } from '../../components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

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
    RouterModule,
    ClickOutsideDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public modal = false;

  public checkForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.pattern("[A-ZА-Я][a-zа-я]*")
    ]],

    password: ['', [
      Validators.required,
      Validators.pattern('[0-9]{1,2}\.[0-9]{2}\.[0-9]{4}')
    ]]
  })

  get fNameControl() {
    return this.checkForm.get('name');
  }

  get fPasswordControl() {
    return this.checkForm.get('password');
  }

  public sendForm() {
    if (!this.fNameControl?.errors && !this.fPasswordControl?.errors) {
      this.authService.isAuthIn({name: this.checkForm.get('name')?.value.trim(), birthday: this.checkForm.get('password')?.value.trim()})
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
  ) {
  }
}
