import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit{
  authService = inject(AuthService);
  
  ngOnInit(): void {
      this.authService.fetchCurrentUser();
  }
}
