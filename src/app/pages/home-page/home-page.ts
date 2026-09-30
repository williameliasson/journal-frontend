import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MoodService } from '../../services/mood-service';

@Component({
  selector: 'app-home-page',
  imports: [ReactiveFormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  
  authService = inject(AuthService);
  moodService = inject(MoodService);
  private http = inject(HttpClient);
  private router = inject(Router);
  Math = Math;

  // src: https://www.youtube.com/watch?v=iTjafzvkoV4
  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    moodId: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
  })
  createJournalEntry(){
    this.http.post("http://localhost:8080/api/me/journalentries", this.form.value, {withCredentials: true}).subscribe(() => {
      console.log("POSTed")
      this.router.navigate(["/entries"])

    })
  }
}
