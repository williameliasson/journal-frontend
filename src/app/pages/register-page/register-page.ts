import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  authService = inject(AuthService)
  errorMessage = signal<string | null>(null);
  form = this.fb.group({
    username:         ['',  Validators.required],
    password:         ['', [Validators.required, Validators.minLength(8)]],
    matchingPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {validators: (group) =>{
    return group.value.password == group.value.matchingPassword ? null : {passwordsDontMatch: true}
  }})
}
