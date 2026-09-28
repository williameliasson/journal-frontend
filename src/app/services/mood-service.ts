import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export type MoodDTO = {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class MoodService {
  moods = signal<MoodDTO[] | null>(null);
  http = inject(HttpClient);

  fetchMoods(){
    this.http.get<MoodDTO[]>("http://localhost:8080/api/moods", {withCredentials: true}).subscribe({next: data => {
      this.moods.set(data);
    }})
  }
}
