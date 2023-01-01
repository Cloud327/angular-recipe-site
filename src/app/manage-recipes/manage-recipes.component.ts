import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe/recipe.service';
import { RecipeSlug } from '../shared/models/recipe';

@Component({
  selector: 'app-manage-recipes',
  templateUrl: './manage-recipes.component.html',
  styleUrls: ['./manage-recipes.component.css']
})
export class ManageRecipesComponent {

  recipes: RecipeSlug[] = []
  constructor (
    private recipeService: RecipeService,
    ) {}
  ngOnInit() {
    this.recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  deleteRecipeButton(recipe: RecipeSlug) {
    console.log("deleting a recipe", recipe)
    this.recipeService.deleteRecipe(recipe.slug).subscribe();
  }
}
