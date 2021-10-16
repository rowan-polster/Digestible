import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ingredient-tile',
  templateUrl: './ingredient-tile.component.html',
  styleUrls: ['./ingredient-tile.component.css']
})
export class IngredientTileComponent implements OnInit {

  ingredients: Ingredient[] = [];
  

  constructor() { }

  ngOnInit(): void {
  }

}
