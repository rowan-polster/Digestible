import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientTileComponent } from './ingredient-tile.component';

describe('IngredientTileComponent', () => {
  let component: IngredientTileComponent;
  let fixture: ComponentFixture<IngredientTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
