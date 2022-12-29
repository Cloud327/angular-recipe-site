import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeSlug } from '../shared/models/recipe';
import { RecipeService } from '../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {


  recipeSlug: RecipeSlug;
  recipeID: number = 1;

  constructor(
    private route: ActivatedRoute,
    private RecipeService: RecipeService,
    // private location: Location,
  ) { }
  
  ngOnInit(): void {
    this.getRecipe();
  }

  deleteButton(): void {
    console.log("button to delete ", this.recipeSlug.slug, "pressed")
    this.RecipeService.deleteRecipe(this.recipeSlug.slug)
  }

  getRecipe(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    console.log("slug ", slug)
    this.RecipeService.getRecipe(slug as any).subscribe(recipe => this.recipeSlug = recipe);  
  }
}
