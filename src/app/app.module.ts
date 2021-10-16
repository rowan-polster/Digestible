import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCarouselModule } from '@ngmodule/material-carousel';

import { AppComponent } from './app.component';
import { FormEntryCardComponent } from './form-entry-card/form-entry-card.component';
import { DragDropCardComponent } from './drag-drop-card/drag-drop-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavButtonComponent } from './nav-bar/nav-button/nav-button.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { RecipeImageComponent } from './image-carousel/recipe-image/recipe-image.component';
import { RecipeModalComponent } from './recipe-modal/recipe-modal.component';
import { IngredientTileComponent } from './ingredient-tile/ingredient-tile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FormEntryCardComponent,
    DragDropCardComponent,
    NavBarComponent,
    NavButtonComponent,
    ImageCarouselComponent,
    RecipeImageComponent,
    RecipeModalComponent,
    IngredientTileComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatCarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
