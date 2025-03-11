import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekCardsComponent } from './week-cards.component';

describe('WeekCardsComponent', () => {
  let component: WeekCardsComponent;
  let fixture: ComponentFixture<WeekCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
