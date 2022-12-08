import { Injectable } from '@angular/core';
import { Food } from 'src/app/shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[] {
    return [
      {id:1,name:"Tomato Soup",   cookTime:"5 min",   imageUrl: "/assets/images/food-1.jpg", tags: ['Soup', 'Red', 'Vegetarian']},
      {id:2,name:"Onion Soup",    cookTime:"10 min",  imageUrl: "/assets/images/food-2.jpg", tags: ['Soup', 'Brown', 'Vegetarian']},
      {id:3,name:"Potato Soup",   cookTime:"15 min",  imageUrl: "/assets/images/food-3.jpg", tags: ['Soup', 'Cream']},
      {id:4,name:"Asparagus Soup",cookTime:"20 min",  imageUrl: "/assets/images/food-4.jpg", tags: ['Soup', 'Cream']},
      {id:5,name:"Meat Soup",     cookTime:"25 min",  imageUrl: "/assets/images/food-5.jpg", tags: ['Soup', 'Brown', 'Meaty']},
      {id:6,name:"Mushroom Soup", cookTime:"30 min",  imageUrl: "/assets/images/food-6.jpg", tags: ['Soup', 'Cream', 'Vegetarian']},
    ]
  }
}
