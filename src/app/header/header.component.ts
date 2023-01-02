import { Component, OnInit } from '@angular/core';
import { AuthService } from '../public/services/auth-service/auth.service';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:User|null

  constructor(public auth:AuthService, private userService:UserService) {
    this.auth.loginStatusChange().subscribe(loggedIn => {
      this.user = this.auth.getLoggedInUser()
    })
   }

  ngOnInit(): void {
    
  }


}
