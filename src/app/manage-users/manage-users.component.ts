import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe/recipe.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {

  users: User[] = []
  
  constructor (
    private recipeService: RecipeService,
    ) {}

  ngOnInit() {
    this.recipeService.getUsers().subscribe(users => this.users = users); // i dont have permission
  }

  deleteUserButton(user: User) {
    console.log("deleting a user", user)
    this.recipeService.deleteUser(user.id as number).subscribe();
  }
}
