import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from 'src/app/services/tools/message.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'http://127.0.0.1:8000/recipes/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** GET all recipes */
  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      tap(_ => this.log('fetched recipes')),
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  /** GET a specific recipe by its slug */
  getRecipe(slug: string):Observable<Recipe>{
    const url = `${this.recipesUrl}${slug}/`;

    return this.http.get<Recipe>(url).pipe(
      tap(_ => this.log(`fetched recipe = ${slug}`)),
      catchError(this.handleError<Recipe>(`getRecipe = ${slug}`))
    )
  }

  /** GET recipes whose name contains the search term */
  searchRecipes(term: string): Observable<Recipe[]> {
    if (!term.trim()) {
      // if not search term, return empty recipe array.
      return of([]);
    }
    return this.http.get<Recipe[]>(`${this.recipesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`found recipes matching "${term}"`) :
        this.log(`no recipes matching "${term}"`)),
      catchError(this.handleError<Recipe[]>('searchRecipes', []))
    );
  }

  /** POST: add a new recipe to the server */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesUrl, recipe, this.httpOptions).pipe(
      tap((newRecipe: Recipe) => this.log(`added recipe = ${newRecipe.slug}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteRecipe(slug: string): Observable<Recipe> {
    const url = `${this.recipesUrl}/${slug}`;

    return this.http.delete<Recipe>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted recipe = ${slug}`)),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  /** PUT: update the hero on the server */
  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put(this.recipesUrl, recipe, this.httpOptions).pipe(
      tap(_ => this.log(`updated recipe = ${recipe.slug}`)),
      catchError(this.handleError<any>('updateRecipe'))
    );
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
