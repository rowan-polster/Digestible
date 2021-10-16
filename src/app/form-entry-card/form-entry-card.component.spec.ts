import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntryCardComponent } from './form-entry-card.component';

describe('FormEntryCardComponent', () => {
  let component: FormEntryCardComponent;
  let fixture: ComponentFixture<FormEntryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEntryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEntryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
