import { Injectable } from '@angular/core';
import { Category, Ingredient, Recipe, RecipeSlug } from 'src/app/shared/models/recipe';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, ReplaySubject, Subject, tap } from 'rxjs';
import { MessageService } from 'src/app/services/tools/message.service';
import { RecipeComment } from 'src/app/shared/models/recipeComment';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  private recipesUrl = 'http://127.0.0.1:8000/recipes/';
  private recipeSlugUrl = 'http://127.0.0.1:8000/recipeSlugs/';
  private ingredientsUrl = 'http://127.0.0.1:8000/ingredients/';
  private categoriesUrl = 'http://127.0.0.1:8000/categories/';
  private commentsUrl = 'http://127.0.0.1:8000/comments/';
  private usersUrl = 'http://127.0.0.1:8000/users/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** GET all recipes */
  getRecipes():Observable<RecipeSlug[]>{


    return this.http.get<RecipeSlug[]>(this.recipeSlugUrl).pipe(
      tap(_ => this.log('fetched recipes')),
      catchError(this.handleError<RecipeSlug[]>('getRecipes', []))
    );
  }
  
  /** GET all users */
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  /** GET all ingredients */
  getIngredients():Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>(this.ingredientsUrl).pipe(
      tap(_ => this.log('fetched ingredients')),
      catchError(this.handleError<Ingredient[]>('getIngredients', []))
    );
  }

  /** GET all categories */
  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.categoriesUrl).pipe(
      tap(_ => this.log('fetched categories')),
      catchError(this.handleError<Category[]>('getCategories', []))
    );
  }

  /** GET a specific recipe by its slug */
  getRecipe(slug: string):Observable<RecipeSlug>{
    const url = `${this.recipeSlugUrl}${slug}/`;

    return this.http.get<RecipeSlug>(url).pipe(
      tap(_ => this.log(`fetched recipe = ${slug}`)),
      catchError(this.handleError<RecipeSlug>(`getRecipe = ${slug}`))
    )
  }


  getRecipeComments(): Observable<RecipeComment[]> {
    return this.http.get<RecipeComment[]>(this.commentsUrl).pipe(
      tap(_ => this.log(`fetched comments`)),
      catchError(this.handleError<RecipeComment[]>(`getRecipeComments`)))
  }
  postRecipeComment(comment: RecipeComment): Observable<RecipeComment> {
    
    return this.http.post<RecipeComment>(this.commentsUrl, comment, this.httpOptions).pipe(
      tap(_ => this.log(`uploaded comment`)), 
      catchError(this.handleError<any>('postRecipeComment')));
  }





  /** GET recipes whose name contains the search term */
  searchRecipes(term: string): Observable<RecipeSlug[]> {
    if (!term.trim()) {
      // if not search term, return empty recipe array.
      return of([]);
    }
    return this.http.get<RecipeSlug[]>(`${this.recipeSlugUrl}?slug=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`found recipes matching "${term}"`) :
        this.log(`no recipes matching "${term}"`)),
      catchError(this.handleError<RecipeSlug[]>('searchRecipes', []))
    );
  }

  /** POST: add a new recipe to the server */
  addRecipe(recipeSlug: RecipeSlug): Observable<any> {
    return this.http.post<RecipeSlug>(this.recipeSlugUrl, recipeSlug, this.httpOptions).pipe(
      tap((newRecipe: RecipeSlug) => this.log(`added recipe = ${newRecipe.recipe.name}`)),
      catchError(this.handleError<RecipeSlug>('addRecipe'))
    );
  }
  /** POST: add a new recipe to the server */
  addRecipeWithoutSlug(recipeSlug: Recipe): Observable<any> {
    return this.http.post<Recipe>(this.recipesUrl, recipeSlug, this.httpOptions).pipe(
      tap((newRecipe: Recipe) => this.log(`added recipe = ${newRecipe.name}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  /** DELETE: delete the recipe from the server */
  deleteRecipe(slug: string): Observable<RecipeSlug> {
    const url = `${this.recipeSlugUrl}${slug}/`;

    return this.http.delete<RecipeSlug>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted recipe = ${slug}`)),
      catchError(this.handleError<RecipeSlug>('deleteRecipe'))
    );
  }



  /** DELETE: delete the comment from the server */
  deleteComment(id: number): Observable<RecipeComment> {
    const url = `${this.commentsUrl}${id}/`;

    return this.http.delete<RecipeComment>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted comment = ${id}`)),
      catchError(this.handleError<RecipeComment>('deleteComment'))
    );
  }
  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}${id}/`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user = ${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the recpe on the server */
  updateRecipe(recipeSlug: RecipeSlug): Observable<RecipeSlug> {
    const url = `${this.recipeSlugUrl}${recipeSlug.slug}/`;
    console.log("recipeSlug:", recipeSlug)
    return this.http.put<RecipeSlug>(url, recipeSlug, this.httpOptions).pipe(
      tap(_ => this.log(`updated recipe = ${recipeSlug.recipe.name}`)),
      catchError(this.handleError<RecipeSlug>('updateRecipe'))
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
