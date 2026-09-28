import { Component, Input } from '@angular/core';
import { JournalEntryDTO } from '../../services/journal-entry-service';

@Component({
  selector: 'app-journal-entry-card',
  imports: [],
  templateUrl: './journal-entry-card.html',
  styleUrl: './journal-entry-card.scss',
})
export class JournalEntryCard {
  @Input() entry!: JournalEntryDTO;
}
