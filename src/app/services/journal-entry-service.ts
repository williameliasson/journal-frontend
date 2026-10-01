import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

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
  router = inject(Router);
  entries = signal<JournalEntryDTO[]>([]);
  authService = inject(AuthService);
  http = inject(HttpClient);

  createJournalEntry(form: FormGroup){
    this.http.post("http://localhost:8080/api/me/journalentries", form.value, {withCredentials: true}).subscribe(() => {
      this.router.navigate(["/entries"])
    })
  }

  fetchMyJournalEntries(){
    if (this.authService.currentUser() == null){
      return;
    }
    this.http.get<JournalEntryDTO[]>("http://localhost:8080/api/me/journalentries", {withCredentials: true}).subscribe({next: data => {
      this.entries.set(data);
    }})
  }
}
