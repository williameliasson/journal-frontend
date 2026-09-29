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
  
  form = this.fb.nonNullable.group({
    from: ['', Validators.required],
    to: ['', Validators.required]
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
