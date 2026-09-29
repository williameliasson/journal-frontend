import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';

// Integer id, String username, String title, Instant createdAt, String moodName) {

export type JournalEntryDTO = {
  id: number,
  username: string,
  title: string,
  createdAt: string,
  moodName: string,
  moodIcon: string
}

@Injectable({
  providedIn: 'root',
})
export class JournalEntryService {
  entries = signal<JournalEntryDTO[]>([]);
  authService = inject(AuthService);
  http = inject(HttpClient);
  fetchMyJournalEntries(){
    if (this.authService.currentUser() == null){
      return;
    }
    this.http.get<JournalEntryDTO[]>("http://localhost:8080/api/me/journalentries", {withCredentials: true}).subscribe({next: data => {
      this.entries.set(data);
    }})
  }
}
