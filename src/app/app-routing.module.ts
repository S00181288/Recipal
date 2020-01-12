import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './Recipes/recipe-list/recipe-list.component';
import { CreateRecipeComponent } from './Recipes/create-recipe/create-recipe.component';

const routes: Routes = [
  { path: "", component: RecipeListComponent },
  { path: "create", component: CreateRecipeComponent },
  { path: "edit/:recipeId", component: CreateRecipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
