import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatisticsService } from '../../services/statistics-service';

@Component({
  selector: 'app-stats-page',
  imports: [ReactiveFormsModule],
  templateUrl: './stats-page.html',
  styleUrl: './stats-page.scss',
})
export class StatsPage {
  private fb = inject(FormBuilder);
  private statisticsService = inject(StatisticsService);
  form = this.fb.nonNullable.group({
    from: ['', Validators.required],
    to: ['', Validators.required]
  })

  fetchStats(){
    // console.log(this.form.value.from);
    const {from, to} = this.form.value;
    this.statisticsService.fetchStats(from!, to!)
  }
}
