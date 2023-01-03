import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    // Removes the token from the local storage, so the user gets logged out & then navigate back to the "public" routes
    this.authService.logout();
    this.router.navigate(['../../']);
  }

}