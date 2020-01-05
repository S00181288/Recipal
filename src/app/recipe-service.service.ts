import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


import { recipe } from './Recipes/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  constructor(private http: HttpClient) { }

  //recipes
  private recipes: recipe[] = [];


  getrecipes() {
    this.http.get<{ message: string, recipes: recipe[] }>('http://localhost:3000/posts')
      .subscribe((recipeData) => {
        //setting recipes to the recipes coming from the response.
        this.recipes = recipeData.recipes;

      });
  }



}
