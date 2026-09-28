import { Component, inject } from '@angular/core';
import { JournalEntryService } from '../../services/journal-entry-service';

@Component({
  selector: 'app-entries-page',
  imports: [],
  templateUrl: './entries-page.html',
  styleUrl: './entries-page.scss',
})
export class EntriesPage {
  journalEntryService = inject(JournalEntryService);
  ngOnInit(): void {
      this.journalEntryService.fetchMyJournalEntries();
  }
}
