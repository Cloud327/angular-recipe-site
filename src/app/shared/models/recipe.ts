export interface Recipe {    
    name:string;
    description:string;
    portionSize:number; 
    creationDate:string;
    categories:Category[];
    ingredients:IngredientAmount[];
    author:string;
}

export interface RecipeSlug {
    recipe:Recipe;
    slug:string
}

 export interface IngredientAmount {
    amount:string;
    ingredient:Ingredient;

}

export interface Category {
    name:string
    description:string
}

export interface Ingredient {
    name:string;
    description:string;
}
