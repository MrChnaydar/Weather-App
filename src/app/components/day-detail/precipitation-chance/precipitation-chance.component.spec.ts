import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitationChanceComponent } from './precipitation-chance.component';

describe('PrecipitationChanceComponent', () => {
  let component: PrecipitationChanceComponent;
  let fixture: ComponentFixture<PrecipitationChanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecipitationChanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecipitationChanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
