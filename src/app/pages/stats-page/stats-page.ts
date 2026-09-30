import { Component, computed, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatisticsService } from '../../services/statistics-service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-stats-page',
  imports: [ReactiveFormsModule, BaseChartDirective],
  templateUrl: './stats-page.html',
  styleUrl: './stats-page.scss',
})
export class StatsPage {
  private fb = inject(FormBuilder);
  private statisticsService = inject(StatisticsService);
  chartNums = computed<number[]>(() => {return this.statisticsService.stats()?.moodStats.map(ms => ms.percentage) ?? []});
  chartLabels = computed<string[]>(() => {return this.statisticsService.stats()?.moodStats.map(ms => ms.moodName) ?? []});
  private today = new Date();
  // private todayLastWeek = new Date(this.today.valueOf()).setDate(this.today.getDate() - 7);
  todayLastWeek: Date = (() => {
    const date = new Date(this.today);
    date.setDate(this.today.getDate() - 7)
    return date;
  })();
  private initialFrom = `${this.todayLastWeek.getFullYear()}-${String(this.todayLastWeek.getMonth()).padStart(2, '0')}-${String(this.todayLastWeek.getDate()).padStart(2, '0')}`
  private initialTo = `${this.today.getFullYear()}-${String(this.today.getMonth() + 1).padStart(2, '0')}-${String(this.today.getDate()).padStart(2, '0')}`
  form = this.fb.nonNullable.group({
    from: [this.initialFrom, Validators.required],
    to: [this.initialTo, Validators.required]
  })
  // src: https://valor-software.com/ng2-charts/pie
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public pieChartType: ChartType = 'pie';
  public pieChartData = computed<ChartData<'pie', number[], string | string[]>>(() => ({
    labels: this.chartLabels(),
    datasets: [
      {
        data: this.chartNums()
      },
    ],
  }));
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  fetchStats(){
    const {from, to} = this.form.value;
    this.statisticsService.fetchStats(from!, to!)
  }
}
