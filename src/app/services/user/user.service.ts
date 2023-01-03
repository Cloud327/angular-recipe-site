import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from 'src/app/shared/models/user';
import { MessageService } from '../tools/message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://127.0.0.1:8000/users/';

  constructor(private http: HttpClient, private messageService:MessageService) { }

  getUser(userId: string|null): Observable<User> {
    const url = `${this.usersUrl}${userId}/`;
    return this.http.get<User>(url);
  }


    /** PUT: update the recpe on the server */
  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}${user.id}/`;
    return this.http.put<User>(url, user).pipe(
      tap(_ => this.log(`Updated user = ${user.id}`)),
      catchError(this.handleError<User>('updateUser'))
    );
  }

  isLoggedIn():boolean {
    if(localStorage.getItem('userData')){

      return true
    }else{
      return false
    }
  }

  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RecipeService: ${message}`);
  }
}
