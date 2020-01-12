import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
//material input module
import {
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from '@angular/material';
// work with forms
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateRecipeComponent } from './Recipes/create-recipe/create-recipe.component';
import { RecipeListComponent } from './Recipes/recipe-list/recipe-list.component';
import { SignupComponent } from './auth/Sign up/signup/signup.component';
import { LoginComponent } from './auth/Log in/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CreateRecipeComponent,
    RecipeListComponent,
    SignupComponent,
    LoginComponent


  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,

    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
