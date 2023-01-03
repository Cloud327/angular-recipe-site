import { getToken, LOCALSTORAGE_TOKEN_KEY } from './../../../app.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest, UserCredentials, LoginResponse, RegisterRequest, RegisterResponse, LoggedInUser } from '../../interfaces';
import { MessageService } from 'src/app/services/tools/message.service';



export const fakeRegisterResponse: RegisterResponse = {
  status: 200,
  message: 'Registration sucessfull.'
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1)

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private messageService: MessageService
  ) { }

  /*
   Due to the '/api' the url will be rewritten by the proxy, e.g. to http://localhost:8080/api/auth/login
   this is specified in the src/proxy.conf.json
   the proxy.conf.json listens for /api and changes the target. You can also change this in the proxy.conf.json

   The `..of()..` can be removed if you have a real backend, at the moment, this is just a faked response
  */
  // login(loginRequest: LoginRequest): Observable<LoginResponse> {
  //   return of(fakeLoginResponse).pipe(
  //     tap((res: LoginResponse) => localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.accessToken)),
  //     tap(() => this.snackbar.open('Login Successfull', 'Close', {
  //       duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
  //     }))
  //   );

  login(username: string, password: string): Observable<LoginResponse> {

    console.log('http://127.0.0.1:8000/api-user-login/')
    return this.http.post<LoginResponse>(
      'http://127.0.0.1:8000/api-user-login/', { username, password }).pipe(
      tap(
        _ =>
        this.log(`login: ${username}`), catchError(this.handleError<LoginResponse>(`login`))
      ),  tap(() => this.snackbar.open('Login Successfull', 'Close', {
              duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'
             }))
      
      );

  }
    // == Example of how backend could be connected ==
    // return this.http.post<LoginResponse>('/api/auth/login', loginRequest).pipe(
    // tap((res: LoginResponse) => localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.accessToken)),
    // tap(() => this.snackbar.open('Login Successfull', 'Close', {
    //  duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    // }))
    // );
  

  /*
   The `..of()..` can be removed if you have a real backend, at the moment, this is just a faked response
  */
  register(email: string, password: string): Observable<RegisterResponse> {
    // TODO
    // return of(fakeRegisterResponse).pipe(
    //   tap((res: RegisterResponse) => this.snackbar.open(`User created successfully`, 'Close', {
    //     duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    //   })),
    // );
    // == Example of how backend could be connected ==
    return this.http.post<RegisterResponse>('http://127.0.0.1:8000/users/', {email, password}).pipe(
    tap((res: RegisterResponse) => this.snackbar.open(`User created successfully`, 'Close', {
     duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    }))
    )
  }

  loginStatusChange(): Observable<boolean> {

    
    return this.loggedIn.asObservable();
  }

  /*
   Get the user fromt the token payload
   */
  getLoggedInUser() {
      const userData: LoggedInUser = JSON.parse(localStorage.getItem('userData') || '{}');
      return userData;
  
  }

  logout(){
    localStorage.removeItem('userData')
    this.loggedIn.next(false)
  }


  setLoggedInUser(userData: LoginResponse): void {
    if (localStorage.getItem('userData') !== JSON.stringify(userData)) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    this.loggedIn.next(true)
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
    this.messageService.add(`AuthService: ${message}`);
  }

  
}