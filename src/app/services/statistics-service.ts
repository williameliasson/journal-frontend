import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { env } from '../../env/env';

// MoodStat(String moodName, double percentage) {
export type MoodStatDTO = {
  moodName: string,
  percentage: number
}
// StatisticsResponse(
// String username, 
// List<MoodStat> moodStats, 
// Integer journalEntryCount) 

export type StatisticsDTO = {
  username: string,
  moodStats: MoodStatDTO[],
  journalEntryCount: number
}

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  private http = inject(HttpClient);
  stats = signal<StatisticsDTO | null>(null)

  fetchStats(from: string, to: string){
    // src: https://www.angularjswiki.com/httpclient/get-params/
    let queryParams = new HttpParams()
    .set("from",from)
    .set("to",to);
    
    this.http.get<StatisticsDTO>(
      env.apiUrl+"/me/journalentries/statistics",
      {
        withCredentials: true,
        params: queryParams
      }
    ).subscribe({next: data => {
      this.stats.set(data);
    }})
  }
}
