import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient)
  private authService = inject(AuthService)
  errorMessage = signal<string | null>(null);
  form = this.fb.group({
    username:         ['',  Validators.required],
    password:         ['', [Validators.required, Validators.minLength(8)]],
    matchingPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {validators: (group) =>{
    return group.value.password == group.value.matchingPassword ? null : {passwordsDontMatch: true}
  }})
  register(){
    // src: https://stackoverflow.com/questions/69898556/how-can-get-the-status-code-of-the-httpclient-module-in-angular
    this.http.post<HttpResponse<any>>("http://localhost:8080/api/register", this.form.value, {observe: "response", withCredentials: true}).subscribe(
      {next: (data) => {
         if (data.status == 201){ // successful registration
          this.router.navigate(["/"]);
          this.authService.fetchCurrentUser();
          } 
      },
      error: (data) => {
        switch (data.status) {
          case 409: {
            this.errorMessage.set("Username already taken")
            break;
          }
          case 400: {
            this.errorMessage.set("Could not register")
            break;
          }
        }
      }
    }
    )
  }
}
