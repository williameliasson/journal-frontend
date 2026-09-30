import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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
  private http = inject(HttpClient)
  private authService = inject(AuthService)

  form = this.fb.group({
    username:         ['',  Validators.required],
    password:         ['', [Validators.required, Validators.minLength(8)]],
    matchingPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {validators: (group) =>{
    return group.value.password == group.value.matchingPassword ? null : {passwordsDontMatch: true}
  }})
  register(){
    this.http.post("http://localhost:8080/api/register", this.form.value, {withCredentials: true}).subscribe(() => {
      this.authService.fetchCurrentUser();
    })
  }
}
