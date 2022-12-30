import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe/recipe.service';
import { Recipe, RecipeSlug } from '../shared/models/recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{

  recipeSlug: RecipeSlug | undefined;

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

  ngOnInit(): void {
    this.getRecipe()
  }

  onSubmit(post:any) {
    console.log("in onSubmit")
    if (this.recipeSlug) {
      // console.log(" recipe before:", this.recipeSlug)
      // this.recipeSlug.recipe.name = post.name;
      // this.recipeSlug.recipe.description = post.description;
      // this.recipeSlug.recipe.portionSize = post.portionSize;

      // console.log("recipe after:", this.recipeSlug)
      let newRecipe: Recipe = {name:post.name, description:post.description, portionSize:post.portionSize};
      let newRecipeSlug: RecipeSlug = {recipe:newRecipe, slug:this.recipeSlug.slug};
      this.recipeService.updateRecipe(newRecipeSlug).subscribe();
    }
    this.router.navigate([''])
  }

  getRecipe(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.recipeService.getRecipe(slug as any).subscribe(recipe => this.recipeSlug = recipe);  
  }


  // Backend is handling slugify
  slugify(name:string) :string {
    // angular should have a method to slugify something...
    return name.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
  }
}