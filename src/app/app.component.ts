import { Component, HostListener } from '@angular/core';
import { Ingredient } from './structures/ingredient';
import { Recipe } from './structures/Recipe';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    recipes : Recipe[];
    ingredients: DatedIngredient[];
    

    cardWidth: string;
    cardHeight: string;
    divWidth: string;

    constructor() {
        this.recipes = [];
        this.ingredients = [
            {info: new Ingredient("Milk", "Dairy"), date: new Date("10/11/2021")},
            {info: new Ingredient("Soda", "Other"), date: new Date()},
            {info: new Ingredient("Pizza", "Other"), date: new Date("10/05/2021")}
        ];
        this.cardWidth = "";
        this.cardHeight = "";
        this.divWidth = "";
    }

    ngOnInit(): void {

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

            this.setCardWidth();
            this.setCardHeight();
            this.setDivWidth();

        }))

    }

    setCardWidth(screenWidth: number = window.innerWidth, maxStrataWidth: number = 2): void {
        let paddingPercentage = 0.55;
        let screenPadding = screenWidth * paddingPercentage;
        let usableArea = screenWidth - screenPadding;
        this.cardWidth = `${this.round(usableArea / maxStrataWidth)}px`
        if (parseInt(this.cardWidth) > usableArea) {
            this.cardWidth = `${this.round(usableArea)}px`
        }
    }

    setCardHeight(): void {
        this.cardHeight = `${parseInt(this.cardWidth) * 1}px`
    }

    setDivWidth(): void {
        let regexAllNumbers = /[0-9]/g;
        this.divWidth = `${parseInt(this.cardWidth) * 2.4}${this.cardWidth.replace(regexAllNumbers, '')}`;        
    }
    
    @HostListener('window:resize')
    onResize() {
        this.setCardWidth();
        this.setCardHeight();
        this.setDivWidth();
    }

    private round(calculation: number, numberOfDecimals: number = 2): number {
        let factor = Number(`1${'0'.repeat(numberOfDecimals)}`);
        return Math.round(calculation * factor) / factor;
    }
    
}

interface DatedIngredient {
    info: Ingredient,
    date: Date
}
