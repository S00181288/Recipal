import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeServiceService } from 'src/app/recipe-service.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  enteredTitle = "";
  enteredContent = "";

  constructor(public recipeService: RecipeServiceService) { }

  onAddRecipe(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.recipeService.addRecipe(form.value.title, form.value.content);
    form.resetForm();
  }

  ngOnInit() {
  }

}
