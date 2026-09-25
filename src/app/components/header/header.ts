import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit{
  authService = inject(AuthService);
  
  ngOnInit(): void {
      this.authService.fetchCurrentUser();
  }
}
