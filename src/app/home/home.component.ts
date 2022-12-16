import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe/recipe.service';
import { Recipe } from '../shared/models/recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes:Recipe[] = [];

  constructor(private RecipeService:RecipeService) { }

  ngOnInit(): void {
    this.RecipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

}
