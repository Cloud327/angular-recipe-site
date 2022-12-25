import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe/recipe.service';
import { Category, Ingredient, Recipe } from '../shared/models/recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {

  recipe: Recipe | undefined;
  // ingredients: Ingredient[] = [];
  // categories: Category[] = [];
  ingredients: string[] = ["tomato", "milk", "beef"];
  categories: string[] = ["vegetarian", "meatetarian", "french"];

  addForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    portionSize: new FormControl(null, [Validators.required]),
    categories: new FormControl(null, [Validators.required]),
    ingredients: new FormControl(null, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getIngredients();
    this.getCategories();
  }

  onSubmit(post:any) {
    console.log("something was submitted: ", post)
  }

  /** get stuff from recipeService */
  getIngredients(): void { }
  getCategories(): void { }

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
