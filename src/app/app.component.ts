import { Component } from '@angular/core';
import { Recipe } from '@structures/Recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    recipes : Recipe[];

    constructor() {
        this.recipes = [];
    }

    ngOnInit() {

        const apiUrl = "https://digestible-test-server.herokuapp.com/5";
        const fetchConfig: object = {
            method: 'GET',
            mode: 'cors'
        };
        fetch(apiUrl, fetchConfig).then(response => response.json().then(json => {

            for (const recipePayload of json.hits) {

                const ingredients = [];
                for (const ingredient of recipePayload.recipe.ingredients) {
                    ingredients.push(ingredient.food);
                }

                this.recipes.push(
                    new Recipe({
                        label: recipePayload.recipe.label,
                        image : recipePayload.recipe.image,
                        link : recipePayload.recipe.url,
                        ingredients: ingredients
                    })
                );
                
            }

        }))

    }
    
}
