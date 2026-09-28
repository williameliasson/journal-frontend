import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryCardList } from './journal-entry-card-list';

describe('JournalEntryCardList', () => {
  let component: JournalEntryCardList;
  let fixture: ComponentFixture<JournalEntryCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalEntryCardList],
    }).compileComponents();

    fixture = TestBed.createComponent(JournalEntryCardList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
