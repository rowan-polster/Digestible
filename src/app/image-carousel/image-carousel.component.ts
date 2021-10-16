import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';


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

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @Input() width;
  @Input() height;

  constructor() {
    this.width = '';
    this.height = '';
  }
  
}
