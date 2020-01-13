import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeServiceService } from 'src/app/Recipes/recipe-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { recipe } from 'src/app/Recipes/Recipe.model'

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {


  enteredTitle = "";
  enteredContent = "";
  private mode = 'create';
  private recipeId: string;
  //recipe for editing
  public recipe: recipe;
  isLoading = false;

  constructor(public recipeService: RecipeServiceService, public route: ActivatedRoute) { }

  ngOnInit() {
    //checking if in edit mode.
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('recipeId')) {
        this.mode = 'edit';
        this.recipeId = paramMap.get('recipeId');
        this.isLoading = true;
        //populate recipe with the recipe you choose to edit
        this.recipeService.getRecipe(this.recipeId).subscribe(recipeData => {
          this.isLoading = false;
          this.recipe = { id: recipeData._id, title: recipeData.title, method: recipeData.method, creator: recipeData.creator }
        });
      } else {
        this.mode = 'create';
        this.recipeId = null;
      }
    });
  }

  onSaveRecipe(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.recipeService.addRecipe(form.value.title, form.value.method);
    } else {
      this.recipeService.updateRecipe(
        this.recipeId,
        form.value.title,
        form.value.method
      );
    }
    form.resetForm();
  }



}
