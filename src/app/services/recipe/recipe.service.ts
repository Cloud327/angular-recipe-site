import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from 'src/app/services/tools/message.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'http://127.0.0.1:8000/recipes/';

  constructor(private http: HttpClient, private messageService: MessageService) { }


  /** GET all recipes */
  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      tap(_ => this.log('fetched recipes')),
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  /** GET a specific recipe by its slug */
  getRecipe(slug:string):Observable<Recipe>{
    return this.http.get<Recipe>(this.recipesUrl+slug+'/')
  }

  searchRecipes(term: string): Observable<Recipe[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Recipe[]>(`${this.recipesUrl}/?name=${term}`)
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

   /** Log a HeroService message with the MessageService */
   private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
