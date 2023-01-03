import { Component } from '@angular/core';
import { LoggedInUser } from '../public/interfaces';
import { AuthService } from '../public/services/auth-service/auth.service';
import { RecipeService } from '../services/recipe/recipe.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {

  users: User[] = []
  currentUser: LoggedInUser
  
  constructor (
    private recipeService: RecipeService,
    private auth: AuthService,
    ) {}

  ngOnInit() {
    this.recipeService.getUsers().subscribe(users => {this.users = users; console.log(users)}); // i dont have permission
    this.currentUser = this.auth.getLoggedInUser()
  }

  deleteUserButton(user: User) {
    console.log("deleting a user", user)
    this.recipeService.deleteUser(user.id as unknown as number).subscribe(result=>this.ngOnInit());
  }
  promoteUser(user: User) {
    console.log("promoting a user", user)
    user.is_staff = true;

    this.recipeService.promoteUser(user).subscribe();
  }
}
