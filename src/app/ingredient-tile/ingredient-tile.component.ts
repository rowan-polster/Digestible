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

    name: string;
    category: string;
    originalShelfLife: number;
    
    daysToExpiration: number;
    isExpired: boolean;
  
    constructor() {
        this.ingredient = new Ingredient("MISSING", "MISSING");
        this.datePurchased = new Date("10/1/2021");
        this.name = this.ingredient.name;
        this.category = this.ingredient.category;
        this.originalShelfLife = this.ingredient.originalShelfLife;
        this.daysToExpiration = this.ingredient.originalShelfLife;
        this.isExpired = false;
    }

    ngOnInit(): void {

        this.checkExpiration();   

    }

    ngOnChanges(changes: SimpleChange) {

        this.name = this.ingredient.name;
        this.category = this.ingredient.category;
        this.originalShelfLife = this.ingredient.originalShelfLife;
        this.checkExpiration();

    }

    private checkExpiration(): void {

        const dateCompare: number = new Date().getTime() - this.datePurchased.getTime();
        const daysElapsed: number = dateCompare / (1000 * 3600 * 24);
        this.daysToExpiration = this.originalShelfLife - daysElapsed;

        if (this.daysToExpiration <= 0) {
            this.isExpired = true;
        } else {
            this.isExpired = false;
        }

    }

}
