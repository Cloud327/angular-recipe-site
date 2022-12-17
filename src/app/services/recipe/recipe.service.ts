import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'http://127.0.0.1:8000/recipes/';

  constructor(private http: HttpClient) { }

  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.recipesUrl);

  }

}
