import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgErrorComponent } from "../../components/ng-error/ng-error.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgErrorComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

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
    this.authService.isAuthIn({name: this.checkForm.get('name')?.value, birthday: this.checkForm.get('password')?.value})
  } else {
    alert('Не заполнены поля')
  }

}

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
  }
}
