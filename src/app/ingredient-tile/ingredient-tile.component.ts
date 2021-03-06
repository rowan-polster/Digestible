import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Ingredient } from '../structures/ingredient';

@Component({
    selector: 'ingredient-tile',
    templateUrl: './ingredient-tile.component.html',
    styleUrls: ['./ingredient-tile.component.css']
})
export class IngredientTileComponent implements OnInit {

    @Input() ingredient: Ingredient;
    @Input() datePurchased: Date;

    private safeColor: string = "#ffe4c4"
    private defaultColor: string = "#ffffff";
    private warnColor: string = "#f3a033"
    private alertColor: string = "#FF6347";

    name: string;
    category: string;
    originalShelfLife: number;
    
    daysToExpiration: number;
    isExpired: boolean;
    myBackground: object = {
        // "background-image" : `radial-gradient(${this.defaultColor} 0%, ${this.defaultColor} 100%)`
        "background-color" : `${this.defaultColor}`,
        "box-shadow" : `inset 0 0 25px #ffe4c4`
    }
  
    constructor() {
        this.ingredient = new Ingredient("MISSING", "MISSING");
        this.datePurchased = new Date("10/17/2021");
        this.name = this.ingredient.name;
        this.category = this.ingredient.category;
        this.originalShelfLife = this.ingredient.originalShelfLife;
        this.daysToExpiration = this.ingredient.originalShelfLife;
        this.isExpired = false;
    }

    ngOnInit(): void {

        this.checkExpiration();   
        this.updateColor();

    }

    ngOnChanges(changes: SimpleChange) {

        this.name = this.ingredient.name;
        this.category = this.ingredient.category;
        this.originalShelfLife = this.ingredient.originalShelfLife;
        this.checkExpiration();
        this.updateColor();

    }

    private checkExpiration(): void {

        const dateCompare: number = new Date().getTime() - this.datePurchased.getTime();
        const daysElapsed: number = dateCompare / (1000 * 3600 * 24);
        this.daysToExpiration = this.originalShelfLife - daysElapsed;
        this.updateColor();

        if (this.daysToExpiration <= 0) {
            this.isExpired = true;
        } else {
            this.isExpired = false;
        }

    }

    private updateColor(): void {

        if (this.daysToExpiration <= 2) {
            Object.assign(this.myBackground, {
                // "background-image" : `radial-gradient(${this.alertColor} 0%, ${this.defaultColor} 100%)`
                "background-color" : `${this.defaultColor}`,
                "box-shadow" : `inset 0 0 25px ${this.alertColor}`,
                
            });
        } else if (this.daysToExpiration <= 3) {
            Object.assign(this.myBackground, {
                // "background-image" : `radial-gradient(${this.alertColor} 0%, ${this.defaultColor} 100%)`
                "background-color" : `${this.defaultColor}`,
                "box-shadow" : `inset 0 0 25px ${this.warnColor}`,
                
            });
        } else {
            Object.assign(this.myBackground, {
                // "background-image" : `radial-gradient(${this.alertColor} 0%, ${this.defaultColor} 100%)`
                "background-color" : `${this.defaultColor}`,
                "box-shadow" : `inset 0 0 25px ${this.safeColor}`,
                
            });
        }

    }

}
