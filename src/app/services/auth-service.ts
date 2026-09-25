import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export type UserDTO = {
  username: string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<string | null>(null);
  http = inject(HttpClient);
  
  fetchCurrentUser(){
    this.http.get<UserDTO>("http://localhost:8080/api/me", {withCredentials: true}).subscribe(data => {
      this.currentUser.set(data.username);
    })
  }
}
