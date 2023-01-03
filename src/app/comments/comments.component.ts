import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe/recipe.service';
import { RecipeComment } from '../shared/models/recipeComment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit{

  /*
  TODO: get comments from database, how?
  TODO: do the stuff for submitting comments to database, how?
  TODO: 
  */

  @Input() recipeID: number; // this value will come from the recipe page

  comments: RecipeComment[] = []
  // comments: RecipeComment[] = [{recipe:2,user:2,text:"this is good"},{recipe:2,user:3,text:"this is meh"},{recipe:2,user:1,text:"this is bad"}];
  panelOpenState: boolean = false;

  constructor (
    private recipeService: RecipeService,
    ) {}


  commentForm = new FormGroup({
    text: new FormControl(null, [Validators.required]),
  })


  ngOnInit() {
    this.getRecipeComments()
  }

  onSubmit(post: any) {
    console.log("comment was submitted:", post)

    // why do i even try? :(
    let comment: RecipeComment = {recipe: this.recipeID, user:2, text:post.text}
    this.recipeService.postRecipeComment(comment).subscribe(result=> this.ngOnInit());
    
    this.commentForm.reset();
    
  }

  deleteComment(comment: RecipeComment){
    this.recipeService.deleteComment(comment.id as number).subscribe(result =>this.ngOnInit());

  }

  getRecipeComments() {
    this.recipeService.getRecipeComments().subscribe(comments => this.comments = comments);
  }

}
