export interface Recipe {    
    name:string;
    slug:string;
    description:string;
    portionSize:number; 
    creationDate:string;
    categories:[{name:string, description:string}];
    ingredients:[{name:string, description:string}];
    author:string;
}
