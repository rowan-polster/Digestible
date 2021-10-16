import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.css']
})
export class RecipeModalComponent implements OnInit {
  
  show = true;

  constructor( ) {
  }
  ngOnInit(): void {
  }

  openModal() {
    
  }

  closeModal() {

  }

}
