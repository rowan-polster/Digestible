import { Component, HostListener, Input } from '@angular/core';
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

    glutenAllergy: boolean = false;
    veggieAllergy: boolean = false;
    kosherAllergy: boolean = false;
    

    cardWidth: string;
    cardHeight: string;
    divWidth: string;

    constructor() {
        this.recipes = [];
        this.ingredients = [
            {info: new Ingredient("Milk", "Dairy"), date: new Date("10/11/2021")},
            {info: new Ingredient("Soda", "Other"), date: new Date()},
            {info: new Ingredient("Eggs", "Other"), date: new Date("10/05/2021")},
            // {info: new Ingredient("Cheese", "Other"), date: new Date("10/01/2021")}
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
        
        const numOfResults : number = 3;
        const extraCalls : number = this.alertIngredients.length < 3 ? 3 - this.alertIngredients.length : 0;
        const from : number = Math.round(Math.random() * 10);
        const to : number = from + numOfResults;
        const appId : string = "c8728e98";
        const appKey : string = "5c86e9ec900ac93823bc0a8c336fe773"
        const fetchConfig: object = {
            method: 'GET',
            mode: 'cors'
        };
        this.recipes = [];
        this.sortIngredients();

            let qString : string = "";
            this.alertIngredients.forEach(ingredient=> {
                qString += `${ingredient.name.toLowerCase()}+`;
            });
            let healthString : string = "";
            if (this.glutenAllergy || this.veggieAllergy || this.kosherAllergy) {
                healthString = "&health=";
                if (this.glutenAllergy) {healthString += "Gluten-Free+"}
                if (this.veggieAllergy) {healthString += "Vegetarian+"}
                if (this.kosherAllergy) {healthString += "Kosher+"}
                healthString = healthString.slice(0, -1);
            }
            let apiUrl : string = `https://api.edamam.com/search?q=${qString}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}${healthString}`;
                
            fetch(apiUrl, fetchConfig).then(response => response.json().then(json => {

                for (const recipePayload of json.hits) {
                            
                    const ingredients : string[] = [];
                    for (const ingredient of recipePayload.recipe.ingredients) {
                        ingredients.push(ingredient.food);
                    }

                    this.recipes.push(
                        new Recipe({
                            label: recipePayload.recipe.label,
                            image : recipePayload.recipe.image,
                            link : recipePayload.recipe.url,
                            ingredients: ingredients,
                            triggerIngredients: this.identifyIngredients(ingredients)
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

    setKosher() : void {
        this.kosherAllergy = !this.kosherAllergy
        // // this.sortIngredients();  
        // this.recommendRecipes();
        this.addIngredient("", "", "");
    }

    setVeggie() : void {
        this.veggieAllergy = !this.veggieAllergy
        // // this.sortIngredients();  
        // this.recommendRecipes();  
    }

    setGluten() : void {
        this.glutenAllergy = !this.glutenAllergy
        // // this.sortIngredients();  
        // this.recommendRecipes();  
    }

    private identifyIngredients(ingredients : string[]): string[] {

        const found: string[] = [];
        for (const ingredient of ingredients) {
            for (const alertIngredient of this.alertIngredients) {

                let compareA = ingredient.toLowerCase();
                let compareB = alertIngredient.name.toLowerCase()
                let tryAdd = false;

                if (compareA === compareB) {tryAdd=true}
                else if (compareA.includes(compareB)) {tryAdd=true}
                else if (compareB.includes(compareA)) {tryAdd=true}

                if (tryAdd) {
                    if (!found.includes(alertIngredient.name)) {
                        found.push(alertIngredient.name)
                    }
                }
                
            }
        }

        return found;
        
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
        this.recommendRecipes();
        
    }

}

export interface DatedIngredient {
    info: Ingredient,
    date: Date
}
