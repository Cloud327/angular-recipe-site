import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe/recipe.service';
import { Category, Ingredient, Recipe, RecipeSlug, RecipeSlugWithFile, RecipeWithFile } from '../shared/models/recipe';
import axios, { AxiosHeaders } from 'axios';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent { 
  knownIngredients: Ingredient[] = [];
  knownCategories: Category[] = [];

  image_file: any 

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
  url: string | ArrayBuffer | null;

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    ) { }

  ngOnInit(): void {
    // get ingredients and categories from backend
    this.getIngredients();
    this.getCategories();

    // add empty ingredient and category
    // this.addIngredient();
    // this.addCategory();
  }

  onSubmit(post:any) {
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(new Date(), 'YYYY-MM-dd') // date needs to be yyyy-mm-dd

    // create a new Recipe to submit to backend
    let newRecipe : Recipe = {name: '', description:''}
    newRecipe.name = post.name;
    newRecipe.description = post.description;
    newRecipe.portionSize = post.portionSize;
    newRecipe.creationDate = formattedDate as string; 
    newRecipe.author = "guest@guest.com"; // TODO: check which user is currently logged in and submit them instead
    newRecipe.categories = post.categories;
    newRecipe.ingredients = post.ingredientAmounts;

    let RecipeSlug : RecipeSlug = {recipe: newRecipe, slug:""}
    this.recipeService.addRecipe(RecipeSlug).subscribe(res => {
      // for the image we first upload the recipeSlug without an image and then update the recipe to add the image

      // i hate doing it like this, but it works i guess...
      // our normal recipeService http solution could not accept that image_file is a file
      // but axios does apparently, so lets use both i guess...
      const imagedata = {"name":post.name,"description":post.description, "portionSize":post.portionSize, "picture":this.image_file}
      axios.put(`http://localhost:8000/recipes/${res.recipe.id}/`,imagedata, {headers: {
        'Content-Type': 'multipart/form-data',}
    }).then(res => console.log("we did it",res))
    });
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
  handleImageChange(event: any) {
    console.log("event", event)
    this.image_file = event.target.files[0];
    console.log("file? ", this.image_file)

    const reader = new FileReader();
    reader.readAsDataURL(this.image_file); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
    }

  }
}
