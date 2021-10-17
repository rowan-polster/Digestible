import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';
import { Recipe } from '../structures/Recipe';


@Component({
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class NgbdCarouselBasic {
  
  // @ViewChild('recipe-modal')
  // modalElement!: ElementRef;

  // constructor(){}

  // openModal() {
    // this.modalElement.openModal();
  // }

  images: string[] = [];

  @Input() width: string;
  @Input() height: string;
  @Input() recipes: Recipe[];

  constructor() {
    this.width = '';
    this.height = '';
    this.recipes = [];
  }

  ngOnChanges() {

    if (this.recipes) {
      this.images = [];
      this.recipes.forEach(recipe => {
        this.images.push(recipe.image)
      })
    }

  }
  
}
