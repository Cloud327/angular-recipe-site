export interface User{
    id?:number;
    is_superuser:boolean;
    is_staff:boolean;
    email:string;
    password:string;
    groups?:[]
    savedRecipes?:[]
    createdRecipes?:[]


}