import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppRoutingModule } from '../app-routing.module';



import { recipe } from './Recipe.model';
import { identifierModuleUrl } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  //Inject router for navigation
  constructor(private http: HttpClient, private router: Router) { }

  //recipes
  private recipes: recipe[] = [];
  private recipesUpdated = new Subject<recipe[]>();


  getrecipes() {
    this.http
      .get<{ message: string, recipes: any }>('http://localhost:3000/recipes')
      .pipe(map((recipeData) => {
        return recipeData.recipes.map(recipe => {
          return {
            title: recipe.title,
            method: recipe.method,
            id: recipe._id,
            creator: recipe.creator
          };
        });
      }))
      .subscribe(Formatedrecipes => {
        //setting recipes to the recipes coming from the response.
        this.recipes = Formatedrecipes;
        this.recipesUpdated.next([...this.recipes]);

      });
  }

  //password
  //vGuriPKiNgaPWmtd

  GetRecipeUpdateLister() {
    return this.recipesUpdated.asObservable();
  }

  //get recipe for editing
  getRecipe(id: string) {
    //return { ...this.recipes.find(p => p.id === id) }
    return this.http.get<{ _id: string, title: string, method: string, creator: string }>('http://localhost:3000/recipes/' + id);
  }

  //add a recipe to the list
  addRecipe(title: string, method: string) {
    const recipe: recipe = { id: null, title: title, method: method };
    this.http
      .post<{ message: string, RecipeId: string }>('http://localhost:3000/recipes', recipe)
      //subscribe is getting response data
      .subscribe(responseData => {
        const id = responseData.RecipeId;
        recipe.id = id;
        this.recipes.push(recipe);
        this.recipesUpdated.next([...this.recipes]);
        //Navigates back to the root route after adding recipe
        this.router.navigate(["/"]);
      });
  }

  //update Recipe
  updateRecipe(id: string, title: string, method: string) {
    const recipe: recipe = { id: id, title: title, method: method, creator: null };
    this.http
      .put("http://localhost:3000/recipes/" + id, recipe)
      .subscribe(response => {
        const RecipesUpdated = [...this.recipes];
        const OldRecipeIndex = RecipesUpdated.findIndex(p => p.id === recipe.id);
        RecipesUpdated[OldRecipeIndex] = recipe;
        this.recipes = RecipesUpdated;
        this.recipesUpdated.next([...this.recipes]);
        this.router.navigate(["/"]);

      });
  }



  deleteRecipe(recipeId: string) {
    this.http.delete("http://localhost:3000/recipes/" + recipeId)
      .subscribe(() => {
        const updatedRecipes = this.recipes.filter(recipe => recipe.id !== recipeId);
        this.recipes = updatedRecipes;
        this.recipesUpdated.next([...this.recipes]);
      });
  }

}
