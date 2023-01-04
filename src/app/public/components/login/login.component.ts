import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { MessageService } from 'src/app/services/tools/message.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { LoginResponse } from '../../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  twofactor:boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private recipeService: RecipeService
  ) { }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    
    console.log(this.loginForm.value.email, this.loginForm.value.password)
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    // .pipe(
    //   // route to protected/dashboard, if login was successfull
    //   tap(() => this.router.navigate(['../../protected/dashboard']))
    // )
    .subscribe({
      next: (data) => {

        this.authService.setLoggedInUser(data);
        if (this.twofactor){
          this.router.navigateByUrl(`/two-factor`);
        }else{
          this.router.navigateByUrl(`/user-profile/${data.id}`);
        }

        
        
    
        

      },
      error: (error) => {
        console.log(error);
      }
    });

    
    

  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(result => {
      let firstKey = sessionStorage.key(0)!.toString()
      if (firstKey){
        let sessionData = JSON.parse(sessionStorage.getItem(firstKey) || '{}')
        let loginData = {
          access_token:sessionData.authResponse.accessToken,
            code:"",
            id_token:sessionData.authResponse.userID,
        }
        this.authService.fbLoginWithAcessToken(loginData).subscribe( data=>{
          this.updateTokenUserData(result, data)

          this.recipeService.getUsers().subscribe(users => {
          let user:LoginResponse = this.findUser(users, result.email)
          user.token = data.key
          this.authService.setLoggedInUser(user)
          this.router.navigateByUrl(`/user-profile/${user.id}`);
          }


          )
          
          
          }
        )

      }
    });

  }

  findUser(users: any, email: any): any{
      for (var user of users){
        if(user.email == email){
          return user
        }
        
      }
  }



  updateTokenUserData(loginData: any, token:any): void{
    let userData = {
      token: token.key,
      email: loginData.email
    }
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  updateTFA(){
    this.twofactor = !this.twofactor
  }





}