import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe/recipe.service';
import { Category, Ingredient, Recipe } from '../shared/models/recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent { 
  // ingredients: Ingredient[] = [];
  // categories: Category[] = [];
  knownIngredients: string[] = ["tomato", "milk", "beef"];
  knownCategories: string[] = ["vegetarian", "meatetarian", "french"];

  addForm = this.formBuilder.group({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    portionSize: new FormControl(null, [Validators.required]),
    ingredientAmounts: this.formBuilder.array([]),
    categories: this.formBuilder.array([]),
  })
  ingredientForm = this.formBuilder.group({
    ingredient: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
  })
  categoryFrom = this.formBuilder.group({
    category: new FormControl(null, [Validators.required])
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // get ingredients and categories from backend
    this.getIngredients();
    this.getCategories();
    this.addIngredient();
    this.addCategory();
  }

  onSubmit(post:any) {
    console.log("something was submitted: ", post)
  }

  /** get stuff from recipeService */
  getIngredients(): void { }
  getCategories(): void { }


  get ingredientAmounts() : FormArray {  
    return this.addForm.get("ingredientAmounts") as FormArray  
  }  

  get categories() : FormArray {
    return this.addForm.get("categories") as FormArray
  }

  addIngredient(): void { 
    this.ingredientAmounts.push(this.ingredientForm) 
  }
  removeIngredient(i:number): void { 
    this.ingredientAmounts.removeAt(i)
  }

  addCategory(): void { 
    this.categories.push(this.categoryFrom) 
  }
  removeCategory(i:number): void { 
    this.categories.removeAt(i)
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
