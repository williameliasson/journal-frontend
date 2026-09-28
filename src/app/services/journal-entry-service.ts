import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

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

  http = inject(HttpClient);
  fetchMyJournalEntries(){
    this.http.get<JournalEntryDTO[]>("http://localhost:8080/api/me/journalentries", {withCredentials: true}).subscribe({next: data => {
      data.forEach(pc => {
        pc.moodIcon = "😎"
      })
      this.entries.set(data);
    }})
  }
}
