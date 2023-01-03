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

  user: User|null

  constructor(public auth:AuthService, private userService:UserService) {
    
   }

  ngOnInit(): void {
    this.auth.loginStatusChange().subscribe(loggedIn => { if (loggedIn == false){
      this.user = null
    }else{
      this.user = this.auth.getLoggedInUser()
    }
       console.log("IS LOGGED IN:, ", loggedIn), console.log("USER: ", this.user)
    })
    
  }


}
