import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../shared/models/recipe';
import { RecipeService } from '../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private RecipeService: RecipeService,
    // private location: Location,
  ) { }
  
  ngOnInit(): void {
    this.getRecipe();
  }

  deleteButton(): void {
    console.log("button to delete ", this.recipe.slug, "pressed")
    this.RecipeService.deleteRecipe(this.recipe.slug)
  }

  getRecipe(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.RecipeService.getRecipe(slug as any).subscribe(recipe => this.recipe = recipe);  
  }
}
