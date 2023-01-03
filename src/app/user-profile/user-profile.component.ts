import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { LoggedInUser } from '../public/interfaces';
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

  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(),
  });

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {
    
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUser(userId).subscribe({
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

  changePassword(): void{
    console.log(this.changePasswordForm.value.password)
    let user: User = {id:this.user?.id, email:this.user?.email, password: this.changePasswordForm.value.password}
    this.userService.updateUser(user).subscribe()
  }
}