import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeImageComponent } from './recipe-image.component';

describe('RecipeImageComponent', () => {
  let component: RecipeImageComponent;
  let fixture: ComponentFixture<RecipeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
