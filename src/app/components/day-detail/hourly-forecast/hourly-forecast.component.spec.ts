import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyForecastComponent } from './hourly-forecast.component';
import { describe, beforeEach, it } from 'node:test';

describe('HourlyForecastComponent', () => {
  let component: HourlyForecastComponent;
  let fixture: ComponentFixture<HourlyForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyForecastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HourlyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
