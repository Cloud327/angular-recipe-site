import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe/recipe.service';
import { RecipeComment } from '../shared/models/recipeComment';

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.css']
})
export class ManageCommentsComponent {

  comments: RecipeComment[] = []
  constructor (
    private recipeService: RecipeService,
    ) {}
  ngOnInit() {
    this.recipeService.getRecipeComments().subscribe(comments => this.comments = comments);
  }
  getRecipeComments() {
    this.recipeService.getRecipeComments().subscribe(comments => this.comments = comments);
  }
  deleteCommentButton(rc: RecipeComment) {
    console.log("deleting a comment", rc)
    this.recipeService.deleteComment(rc.id as number).subscribe();
  }
}
