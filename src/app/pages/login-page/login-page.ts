import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  
  private fb = inject(FormBuilder);
  private http = inject(HttpClient)
  private authService = inject(AuthService)

  form = this.fb.group({
    username: [''],
    password: ['']
  })
  login(){
    this.http.post("http://localhost:8080/api/login", this.form.value, {withCredentials: true}).subscribe(() => {
      this.authService.fetchCurrentUser();
    })
  }
}
