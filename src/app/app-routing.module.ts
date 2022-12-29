import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'recipe-page/:slug',component:RecipePageComponent},
  {path:'edit-recipe/:slug',component:EditRecipeComponent},
  {path:'add-recipe',component:AddRecipeComponent},
  {path:'manage-user',component:ManageUserComponent},
  {
    // Lazy Loading the public module (all children routes will be under '/public/{route from lazy loaded module}')
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    // Lazy Loading the protected module (all children routes will be under '/protected/{route from lazy loaded module}')
    // The guard will check if the user is having a jwt, otherwise he will be redirected to the base route
    path: 'protected',
    canActivate: [AuthGuard],
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)
  },
  {
    // Redirects all paths that are not matching to the 'public' route/path
    path: '**',
    redirectTo: 'public',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
