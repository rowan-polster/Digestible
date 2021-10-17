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
    Swal.fire({
      title: recipe.label,
      // text: 'List of Ingredients',
      imageUrl: recipe.image,
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
      confirmButtonColor: '#000000'
    })
  }

}
