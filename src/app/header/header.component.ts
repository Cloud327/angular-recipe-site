import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LoggedInUser } from '../public/interfaces';
import { AuthService } from '../public/services/auth-service/auth.service';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: LoggedInUser|null

  constructor(public auth:AuthService, private userService:UserService, private router:Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!router.navigated){
          let temp = this.auth.getLoggedInUser()
          if (temp.email){
            this.user = temp
          }
        }

      }
    });
  }
  

  isLoggedInUser(obj: any): obj is LoggedInUser {
    // ??? check for type property
    return 'type' in obj && obj.type === 'LoggedInUser';
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
