import { Component, OnInit } from '@angular/core';
import { bindCallback } from 'rxjs';
import Swal from 'sweetalert2'
import { Recipe } from '../structures/Recipe';

@Component({
  selector: 'recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css']
})
export class RecipeModalComponent implements OnInit {
  show = true;

  constructor() {
  }
  ngOnInit(): void {
  }

  openModal(recipe: Recipe) {
    let output: string = `This recipe would help you finish your `;
    if (recipe.triggerIngredients.length === 1) {
      output += `${recipe.triggerIngredients[0]}!`
    } else {
      for (let i=0; i<recipe.triggerIngredients.length; i++) {
        if (i < recipe.triggerIngredients.length - 2) {
          output += `${recipe.triggerIngredients[i]}, `
        } else if (i < recipe.triggerIngredients.length - 1) {
          output += `${recipe.triggerIngredients[i]}, and `
        } else {
          output += `${recipe.triggerIngredients[i]}!`
        }
      }
    }
    Swal.fire({
      title: recipe.label,
      text: output,
      imageUrl: recipe.image,
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
      confirmButtonColor: '#000000'
    })
  }

}
