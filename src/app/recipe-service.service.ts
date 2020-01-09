import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';


import { recipe } from './Recipes/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  constructor(private http: HttpClient) { }

  //recipes
  private recipes: recipe[] = [];
  private recipesUpdated = new Subject<recipe[]>();


  getrecipes() {
    this.http.get<{ message: string, recipes: recipe[] }>('http://localhost:3000/posts')
      .subscribe((recipeData) => {
        //setting recipes to the recipes coming from the response.
        this.recipes = recipeData.recipes;

      });
  }

  GetRecipeUpdateLister() {
    return this.recipesUpdated.asObservable();
  }

  addRecipe(title: string, content: string) {
    const recipe: recipe = { title: title, content: content };
    this.recipes.push(recipe);
    this.recipesUpdated.next([...this.recipes]);
  }



}
