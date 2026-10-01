import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoodService } from '../../services/mood-service';
import { JournalEntryService } from '../../services/journal-entry-service';

@Component({
  selector: 'app-home-page',
  imports: [ReactiveFormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  moodService = inject(MoodService);
  journalEntryService = inject(JournalEntryService);
  Math = Math;

  form = this.fb.group({
    title: ['', Validators.required],
    moodId: ['', Validators.required]
  }) 
}
