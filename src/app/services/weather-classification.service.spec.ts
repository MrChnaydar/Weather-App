import { TestBed } from '@angular/core/testing';

import { WeatherClassificationService } from './weather-classification.service';

describe('WeatherClassificationService', () => {
  let service: WeatherClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
