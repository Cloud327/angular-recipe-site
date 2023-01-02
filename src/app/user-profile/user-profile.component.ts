import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: User|null = null;

  constructor(private UserService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.UserService.getUserProfile(userId).subscribe({
        next: (data) => {
          console.log(data);
          this.userProfile = data;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}