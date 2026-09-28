import { Component, Input } from '@angular/core';
import { JournalEntryCard } from '../journal-entry-card/journal-entry-card';
import { JournalEntryDTO } from '../../services/journal-entry-service';

@Component({
  selector: 'app-journal-entry-card-list',
  imports: [JournalEntryCard],
  templateUrl: './journal-entry-card-list.html',
  styleUrl: './journal-entry-card-list.scss',
})
export class JournalEntryCardList {
  @Input() entriesList!: null | JournalEntryDTO[];
}
