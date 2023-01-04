export interface Recipe {
    id?:number;    
    name:string;
    description?:string;
    portionSize?:number; 
    creationDate?:string;
    categories?:Category[];
    ingredients?:IngredientAmount[];
    author?:string;
    picture?:string | File;
}
export interface RecipeWithFile {
    id?:number;    
    name:string;
    description?:string;
    portionSize?:number; 
    creationDate?:string;
    categories?:Category[];
    ingredients?:IngredientAmount[];
    author?:string;
    picture?:File;
}

export interface RecipeSlug {
    recipe:Recipe;
    slug:string
}
export interface RecipeSlugWithFile {
    recipe:RecipeWithFile;
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
