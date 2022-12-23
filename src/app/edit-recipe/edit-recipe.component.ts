import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe/recipe.service';
import { Recipe } from '../shared/models/recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {

  recipe: Recipe | undefined;

  editForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    portionSize: new FormControl(null, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) { }

  onSubmit(post:any) {
    if (this.recipe) {
      this.recipe.name = post.name;
      this.recipe.description = post.description;
      this.recipe.portionSize = post.portionSize;
      this.recipeService.updateRecipe(this.recipe)
    }
  }

  getRecipe(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.recipeService.getRecipe(slug as any).subscribe(recipe => this.recipe = recipe);  
  }
}