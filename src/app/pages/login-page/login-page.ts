import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  
  private router = inject(Router)
  private fb = inject(FormBuilder);
  private http = inject(HttpClient)
  private authService = inject(AuthService)
  errorMessage = signal<null | string>(null);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
  login(){
    this.http.post<HttpResponse<any>>("http://localhost:8080/api/login", this.form.value, {observe: "response", withCredentials: true}).subscribe(
      {next: (data) => {
        this.errorMessage.set(null);
        if (data.status == 200){ // ok login
          this.authService.fetchCurrentUser();
          this.router.navigate(["/"])
        }
      }, error: (data) => {
        this.errorMessage.set("Could not login")
      }
  })
  }
}
