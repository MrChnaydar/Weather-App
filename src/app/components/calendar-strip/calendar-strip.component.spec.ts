import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarStripComponent } from './calendar-strip.component';

describe('CalendarStripComponent', () => {
  let component: CalendarStripComponent;
  let fixture: ComponentFixture<CalendarStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarStripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
