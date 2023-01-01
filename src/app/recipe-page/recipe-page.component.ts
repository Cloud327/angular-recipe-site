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
  recipeID: number = -1;

  constructor(
    private route: ActivatedRoute,
    private RecipeService: RecipeService,
    // private location: Location,
  ) { }
  
  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    console.log("slug ", slug)
    this.RecipeService.getRecipe(slug as any).subscribe(recipeSlug =>{ 
      this.recipeSlug = recipeSlug;
      this.recipeID = this.recipeSlug.recipe.id?this.recipeSlug.recipe.id:-1; // recipeID is set if it exists, otherwise is -1
    });  
  }
}
