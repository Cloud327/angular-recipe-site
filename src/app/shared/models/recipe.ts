export interface Recipe {     // ! means value is mandatory
    name:string;
    slug:string;
    description:string;
    portionSize:number; // ? means value is optional
    creationDate:string;
    categories:[];
    ingredients:[];
    author:string;
}
