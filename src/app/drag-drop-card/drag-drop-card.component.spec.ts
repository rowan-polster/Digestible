import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropCardComponent } from './drag-drop-card.component';

describe('DragDropCardComponent', () => {
  let component: DragDropCardComponent;
  let fixture: ComponentFixture<DragDropCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
