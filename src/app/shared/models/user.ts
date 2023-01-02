export interface User{
    token?:string;
    id?:Int16Array;
    isSuperuser:boolean;
    isStaff:boolean;
    email:string;
    password:string;
    groups?:[]
    savedRecipes?:[]
    createdRecipes?:[]


}