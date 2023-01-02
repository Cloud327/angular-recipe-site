import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { MenuButtonComponent } from './menu-button/menu-button.component';
import { HomeComponent } from './home/home.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesComponent } from './messages/messages.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';

import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { CommentsComponent } from './comments/comments.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { ManageRecipesComponent } from './manage-recipes/manage-recipes.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SecretComponent } from './secret/secret.component';




export const LOCALSTORAGE_TOKEN_KEY = 'angular-recipe-site';

export function getToken() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // MenuButtonComponent,
    MessagesComponent,
    HomeComponent,
    RecipePageComponent,
    EditRecipeComponent,
    AddRecipeComponent,
    CommentsComponent,
    ManageUserComponent,
    ManageCommentsComponent,
    ManageRecipesComponent,
    ManageUsersComponent,
    SecretComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: ['localhost:3000', 'localhost:8080'],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
