import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export type UserDTO = {
  username: string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<string | null>(null);
  router = inject(Router);
  http = inject(HttpClient);
  
  fetchCurrentUser(){
    this.http.get<UserDTO>("http://localhost:8080/api/me", {withCredentials: true}).subscribe(data => {
      this.currentUser.set(data.username);
    })
  }
  register(form: FormGroup, errorMessage: WritableSignal<null | string>){
    // src: https://stackoverflow.com/questions/69898556/how-can-get-the-status-code-of-the-httpclient-module-in-angular
    this.http.post<HttpResponse<any>>("http://localhost:8080/api/register", form.value, {observe: "response", withCredentials: true}).subscribe(
      {next: (data) => {
         if (data.status == 201){ // successful registration
          this.router.navigate(["/"]);
          this.fetchCurrentUser();
          } 
      },
      error: (data) => {
        switch (data.status) {
          case 409: {
            errorMessage.set("Username already taken")
            break;
          }
          case 400: {
            errorMessage.set("Could not register")
            break;
          }
        }
      }
    }
    )
  }

  login(form: FormGroup, errorMessage: WritableSignal<null | string>){
    this.http.post<HttpResponse<any>>("http://localhost:8080/api/login", form.value, {observe: "response", withCredentials: true}).subscribe(
      {next: (data) => {
        errorMessage.set(null);
        if (data.status == 200){ // ok login
          this.fetchCurrentUser();
          this.router.navigate(["/"])
        }
      }, error: (data) => {
        if (data.status == 401){
          errorMessage.set("Incorrect credentials")
        }
      }
    })
  }

  logout(){
    this.http.post<void>("http://localhost:8080/api/logout",{}, {withCredentials: true}).subscribe();
    this.currentUser.set(null);
  };
  
}
