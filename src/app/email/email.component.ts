import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../public/services/auth-service/auth.service';
import { EmailService } from '../services/email/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit{

  title = 'nodeMailerApp';
  nodeMailerForm :FormGroup;

  constructor(private formBuilder:FormBuilder,private emailService:EmailService, private authService:AuthService){}

  ngOnInit(){
    this.nodeMailerForm = this.formBuilder.group({
       email:[null,[Validators.required]],
       message:[null,[Validators.required]]
    });
  }

  sendMail(){
    alert("jjj");
    let email  = this.nodeMailerForm.value.email;
    let message = this.nodeMailerForm.value.message;
    let reqObj = {
      full_name:this.authService.getLoggedInUser().email,
      email:email,
      query:message,
      status:""
    }
    this.emailService.sendMessage(reqObj).subscribe((data: any)=>{
      console.log(data);
    })
  }

}
