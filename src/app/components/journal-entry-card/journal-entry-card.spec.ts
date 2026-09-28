import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryCard } from './journal-entry-card';

describe('JournalEntryCard', () => {
  let component: JournalEntryCard;
  let fixture: ComponentFixture<JournalEntryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalEntryCard],
    }).compileComponents();

    fixture = TestBed.createComponent(JournalEntryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
