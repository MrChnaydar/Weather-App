import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourCardComponent } from './hour-card.component';

describe('HourCardComponent', () => {
  let component: HourCardComponent;
  let fixture: ComponentFixture<HourCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
