export class Food {
    id!:number;     // ! means value is mandatory
    name!:string;
    tags?:string[]; // ? means value is optional
    imageUrl!:string;
    cookTime!:string;
}