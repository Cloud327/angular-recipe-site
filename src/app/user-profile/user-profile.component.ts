import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../public/services/auth-service/auth.service';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User|null = null;

  constructor(private UserService: UserService, private activatedRoute: ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {
    
    this.user = this.authService.getLoggedInUser()
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.UserService.getUser(userId).subscribe({
        next: (data) => {
          console.log(data);
          this.user = data;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}