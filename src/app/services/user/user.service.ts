import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userId: string|null): Observable<User> {
    return this.http.get<User>(`http://127.0.0.1:8000/users/${userId}/`);
  }

  isLoggedIn():boolean {
    if(localStorage.getItem('userData')){

      return true
    }else{
      return false
    }
  }
}