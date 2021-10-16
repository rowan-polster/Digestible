import { Component, OnInit } from '@angular/core';
import { bindCallback } from 'rxjs';
import Swal from 'sweetalert2'

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

  openModal() {
    Swal.fire({
      title: 'This is a Recipe Title',
      text: 'List of Ingredients',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonColor: '#000000'
    })
  }

  closeModal() {

  }

}
