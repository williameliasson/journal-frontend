import { Component, inject, Input } from '@angular/core';
import { JournalEntryDTO, JournalEntryService } from '../../services/journal-entry-service';
import { JournalEntryCardList } from '../../components/journal-entry-card-list/journal-entry-card-list';

@Component({
  selector: 'app-entries-page',
  imports: [JournalEntryCardList],
  templateUrl: './entries-page.html',
  styleUrl: './entries-page.scss',
})
export class EntriesPage {
  journalEntryService = inject(JournalEntryService);

  ngOnInit(): void {
      this.journalEntryService.fetchMyJournalEntries();
  }
}
