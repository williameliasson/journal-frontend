import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { env } from '../../env/env';

export type MoodDTO = {
  id: number,
  name: string,
  icon: string
}

@Injectable({
  providedIn: 'root',
})
export class MoodService {
  moods = signal<MoodDTO[]>([]);
  authService = inject(AuthService);
  http = inject(HttpClient);

  private readonly fetchMoodsEffect = effect(() => {
    this.authService.currentUser(); // dependency
    this.fetchMoods()
  })
  fetchMoods(){
    this.http.get<MoodDTO[]>(env.apiUrl+"/moods", {withCredentials: true}).subscribe({next: data => {
      this.moods.set(data);
    }})
  }
}
