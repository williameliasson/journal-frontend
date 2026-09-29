import { Component, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
import { MoodService } from '../../services/mood-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit{
  authService = inject(AuthService);
  moodService = inject(MoodService);
  ngOnInit(): void {
      this.authService.fetchCurrentUser();
      this.moodService.fetchMoods();
  }
}
