import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe/recipe.service';
import { RecipeSlug } from '../shared/models/recipe';

@Component({
  selector: 'app-manage-recipes',
  templateUrl: './manage-recipes.component.html',
  styleUrls: ['./manage-recipes.component.css']
})
export class ManageRecipesComponent {

  knownRecipes: RecipeSlug[] = []
  recipes: RecipeSlug[] = []

  constructor (
    private recipeService: RecipeService,
    ) {}
  ngOnInit() {
    this.recipeService.getRecipes().subscribe(recipes => {this.recipes = recipes; this.knownRecipes = recipes});
  }

  recipeNameSearchFieldChanged(term:string) {
    if (term.length == 0) {
      this.recipes = this.knownRecipes
      return
    }
    var searchedRecipes: RecipeSlug[] = []
    for(let recipe of this.recipes) {
      if (recipe.recipe.name.includes(term)) {
        searchedRecipes.push(recipe)
      }
    }
    this.recipes = []
    this.recipes = searchedRecipes
  }
  recipeSlugSearchFieldChanged(term:string) {
    if (term.length == 0) {
      this.recipes = this.knownRecipes
      return
    }
    var searchedRecipes: RecipeSlug[] = []
    for(let recipe of this.recipes) {
      if (recipe.slug.includes(term)) {
        searchedRecipes.push(recipe)
      }
    }
    this.recipes = []
    this.recipes = searchedRecipes
  }


  deleteRecipeButton(recipe: RecipeSlug) {
    console.log("deleting a recipe", recipe)
    this.recipeService.deleteRecipe(recipe.slug).subscribe();
  }
}
