export interface User{
    token?:string;
    id?:Int16Array;
    is_superuser:boolean;
    is_staff:boolean;
    email:string;
    password:string;
    groups?:[]
    savedRecipes?:[]
    createdRecipes?:[]


}