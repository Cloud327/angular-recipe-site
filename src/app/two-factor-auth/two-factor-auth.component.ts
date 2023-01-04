import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../public/services/auth-service/auth.service';
import { EmailService } from '../services/email/email.service';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.css']
})
export class TwoFactorAuthComponent implements OnInit {

  generatedNumber:number

  user:any

  numberForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
      private authService:AuthService,
      private mail:EmailService,
      private router: Router,
      private snackbar: MatSnackBar,) { 
    
  }

  ngOnInit(){
    this.numberForm = this.formBuilder.group({
      enteredNumber:[null,[Validators.required]]
     });
    this.user = this.authService.getLoggedInUser()
    this.authService.logout()

    this.generateAndSend()
  }

  checkNumber(){
    if(this.generatedNumber == this.numberForm.value.enteredNumber){
      this.authService.setLoggedInUser(this.user)
      this.router.navigateByUrl(`/user-profile/${this.user.id}`);
    }else{
      this.snackbar.open('Wrong number, new number sent', 'Close', {
        duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'
       })
       this.generateAndSend()


    }
    
  }

  generateAndSend(){

    this.generatedNumber = this.getRandomArbitrary(10000, 99999)

    let message = {
      full_name:"two-factor authentication",
      email:this.user.email,
      query:this.generatedNumber,
      status:""
    }
    console.log("MESSAGE", message)
    
    this.mail.sendMessage(message).subscribe()

  }

  getRandomArbitrary(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

}
