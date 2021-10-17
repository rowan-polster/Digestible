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
    alertIngredients: Ingredient[];
    

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
        this.alertIngredients = [];
        this.cardWidth = "";
        this.cardHeight = "";
        this.divWidth = "";
    }

    ngOnInit(): void {

        // const apiUrl = "https://digestible-test-server.herokuapp.com/5";
        // const fetchConfig: object = {
        //     method: 'GET',
        //     mode: 'cors'
        // };
        // fetch(apiUrl, fetchConfig).then(response => response.json().then(json => {

        //     for (const recipePayload of json.hits) {

        //         const ingredients = [];
        //         for (const ingredient of recipePayload.recipe.ingredients) {
        //             ingredients.push(ingredient.food);
        //         }

        //         this.recipes.push(
        //             new Recipe({
        //                 label: recipePayload.recipe.label,
        //                 image : recipePayload.recipe.image,
        //                 link : recipePayload.recipe.url,
        //                 ingredients: ingredients,
        //                 triggerIngredients: ["Test Payload One", "Test Payload Two", "Test Payload Three", "Test Payload Four"]
        //             })
        //         );
                
        //     }            

        // })).then(() => {
        //     this.setCardWidth();
        //     this.setCardHeight();
        //     this.setDivWidth();
        //     this.sortIngredients();
        // });

        this.recommendRecipes();

    }

    ngOnChanges() {
        this.sortIngredients();
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

    private sortIngredients(): void {

        this.ingredients.sort((a: DatedIngredient, b: DatedIngredient) => {


            let a_ramainingLife: number = (new Date().getTime() - a.date.getTime()) / (1000 * 3600 * 24);
            let b_ramainingLife: number = (new Date().getTime() - b.date.getTime()) / (1000 * 3600 * 24);

            if (a_ramainingLife < b_ramainingLife) {
                return 1;
            } else if (a_ramainingLife > b_ramainingLife) {
                return -1;
            }
            return 0;            

        });

        this.alertIngredients = [];
        for (const ingredient of this.ingredients) {
            let remainingLife: number = (new Date().getTime() - ingredient.date.getTime()) / (1000 * 3600 * 24);
            if (remainingLife >= 3) {
                this.alertIngredients.push(ingredient.info);
            }
        }
        
    }

    isExpiringSoon(ingredient: DatedIngredient) : boolean {
        let remainingLife: number = (new Date().getTime() - ingredient.date.getTime()) / (1000 * 3600 * 24);
        if (remainingLife >= 3) {
            return true
        }
        return false;
    }

    private recommendRecipes(): void {
        
        const numOfResults : number = 4;
        const from : number = Math.round(Math.random() * 10);
        const to : number = from + numOfResults;
        const appId : string = "c8728e98";
        const appKey : string = "5c86e9ec900ac93823bc0a8c336fe773"
        const apiUrl : string = `https://api.edamam.com/search?q=chicken&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;
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
                        ingredients: ingredients,
                        triggerIngredients: ["Test Payload"]
                    })
                );
                
            }

        })).then(() => {
            this.setCardWidth();
            this.setCardHeight();
            this.setDivWidth();
            this.sortIngredients();
        });

    }

    addIngredient(name: string, category: string, date: string) : void {

        if (name !== "" && category !== "" && date !== "") {            
            
            let food: Ingredient = new Ingredient(name, category);
            this.ingredients.push({
                info: food,
                date: new Date(date)
            });

        }

        this.sortIngredients();
        
    }

}

export interface DatedIngredient {
    info: Ingredient,
    date: Date
}
