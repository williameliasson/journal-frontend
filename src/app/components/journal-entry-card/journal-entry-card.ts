import { Component, Input } from '@angular/core';
import { JournalEntryDTO } from '../../services/journal-entry-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-journal-entry-card',
  imports: [DatePipe],
  templateUrl: './journal-entry-card.html',
  styleUrl: './journal-entry-card.scss',
})
export class JournalEntryCard {
  @Input() entry!: JournalEntryDTO;
}
