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
  knownIngredients: Ingredient[] = [];
  knownCategories: Category[] = [];

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

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    ) { }

  ngOnInit(): void {
    // get ingredients and categories from backend
    this.getIngredients();
    this.getCategories();
    this.addIngredient();
    this.addCategory();
  }

  onSubmit(post:any) {
    let newRecipe : Recipe = {name: '', description:'',portionSize:1,creationDate:'',categories: [], ingredients: [], author:''}
    newRecipe.name = post.name;
    newRecipe.description = post.description;
    newRecipe.portionSize = post.portionSize;
    newRecipe.creationDate = new Date().toDateString(); // i dont know which format this is, but i dont know what format we use either soo...
    newRecipe.author = "guest"; // TODO: check which user is currently logged in and submit them instead
    newRecipe.categories = post.categories;
    newRecipe.ingredients = post.ingredientAmounts;

    console.log("trying to submit: ", newRecipe);
    this.recipeService.addRecipe(newRecipe);
  }

  /** get stuff from recipeService */
  getIngredients(): void {
    this.recipeService.getIngredients().subscribe(ingredients => this.knownIngredients = ingredients)
   }
  getCategories(): void {
    this.recipeService.getCategories().subscribe(categories => this.knownCategories = categories)
   }


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
