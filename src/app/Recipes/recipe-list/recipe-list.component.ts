import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RecipeServiceService } from 'src/app/Recipes/recipe-service.service';
import { recipe } from '../Recipe.model';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  /* test data
  Recipes = [
    { title: "yup", content: "test", },
    { title: "yup2", content: "test2", },
    { title: "yup3", content: "test3", }
  ];
*/
  constructor(public recipeservice: RecipeServiceService, private authService: AuthService) { }

  recipes: recipe[] = [];
  private recipeSub: Subscription;
  private authStatusSub: Subscription
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;



  ngOnInit() {
    this.isLoading = true;
    //trigger http request
    this.recipeservice.getrecipes();
    this.userId = this.authService.getUserId();
    //subscribe to the data from the response you can 
    //use the json to display the data
    this.recipeSub = this.recipeservice.GetRecipeUpdateLister()
      .subscribe((recipes: recipe[]) => {
        this.isLoading = false;
        this.recipes = recipes;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(postId: string) {
    this.recipeservice.deleteRecipe(postId);
  }


  ngOnDestroy() {
    this.recipeSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
