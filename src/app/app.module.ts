import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { MenuButtonComponent } from './menu-button/menu-button.component';
import { HomeComponent } from './home/home.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipePageComponent } from './recipe-page/recipe-page.component';

export const LOCALSTORAGE_TOKEN_KEY = 'angular-recipe-site';

export function getToken() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // MenuButtonComponent,
    HomeComponent,
    RecipePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
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
