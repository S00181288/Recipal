import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RecipeServiceService } from 'src/app/Recipes/recipe-service.service';
import { recipe } from '../Recipe.model';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

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

  recipes: recipe[] = [];
  private recipeSub: Subscription;
  isLoading = false;

  constructor(public recipeservice: RecipeServiceService) { }

  ngOnInit() {
    this.isLoading = true;
    //trigger http request
    this.recipeservice.getrecipes();
    //subscribe to the data from the response you can 
    //use the json to display the data
    this.recipeSub = this.recipeservice.GetRecipeUpdateLister()
      .subscribe((recipes: recipe[]) => {
        this.isLoading = false;
        this.recipes = recipes;
      });
  }

  onDelete(postId: string) {
    this.recipeservice.deleteRecipe(postId);
  }


  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

}
