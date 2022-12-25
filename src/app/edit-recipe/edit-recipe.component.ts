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
export class EditRecipeComponent implements OnInit{

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

  ngOnInit(): void {
    this.getRecipe();
  }

  onSubmit(post:any) {
    console.log("in onSubmit")
    if (this.recipe) {
      console.log(" recipe before:", this.recipe)
      console.log("trying to update ", this.recipe.name, "into ", this.slugify(post.name));
      this.recipe.name = post.name;
      this.recipe.slug = this.slugify(post.name);
      this.recipe.description = post.description;
      this.recipe.portionSize = post.portionSize;

      console.log("recipe after:", this.recipe)
      this.recipeService.updateRecipe(this.recipe)
    }
    this.router.navigate([''])
  }

  getRecipe(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.recipeService.getRecipe(slug as any).subscribe(recipe => this.recipe = recipe);  
  }

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