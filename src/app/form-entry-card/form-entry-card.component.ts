import { Component, Input, OnInit } from '@angular/core';
import { DatedIngredient } from '../app.component';
import { Ingredient } from '../structures/ingredient';

@Component({
  selector: 'form-entry-card',
  templateUrl: './form-entry-card.component.html',
  styleUrls: ['./form-entry-card.component.css']
})
export class FormEntryCardComponent implements OnInit {

    @Input() width: string;
    @Input() height: string;
    @Input() ingredients: DatedIngredient[];

    constructor() {

        this.width = '';
        this.height = '';
        this.ingredients = [];
        
    }

    ngOnInit(): void { }

    ngOnChanges(): void { }

}
