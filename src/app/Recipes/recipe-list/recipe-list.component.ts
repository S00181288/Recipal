import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RecipeServiceService } from 'src/app/recipe-service.service';
import { recipe } from '../Recipe.model';
import { Subscription } from 'rxjs';

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
  private recipeSub: Subscription

  constructor(public recipeservice: RecipeServiceService) { }

  ngOnInit() {
    this.recipes = this.recipeservice.getrecipes();
    this.recipeSub = this.recipeservice.GetRecipeUpdateLister()
      .subscribe((posts: recipe[]) => {
        this.recipes = this.recipes;
      });
  }


  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

}
