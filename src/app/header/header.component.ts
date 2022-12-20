import { Component, OnInit } from '@angular/core';
import { AuthService } from '../public/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }
}
