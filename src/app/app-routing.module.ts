import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './Recipes/recipe-list/recipe-list.component';
import { CreateRecipeComponent } from './Recipes/create-recipe/create-recipe.component';
import { LoginComponent } from './auth/Log in/login/login.component';
import { SignupComponent } from './auth/Sign up/signup/signup.component';
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: RecipeListComponent },
  { path: "create", component: CreateRecipeComponent, canActivate: [AuthGuard] },
  { path: "edit/:recipeId", component: CreateRecipeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
