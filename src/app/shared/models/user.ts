export interface User{
    is_superuser:boolean;
    is_staff:boolean;
    email:string;
    password:string;
    groups?:[]
    savedRecipes?:[]
    createdRecipes?:[]


}