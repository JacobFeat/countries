import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesFilterComponent } from './countries-filter.component';

describe('CountriesFilterComponent', () => {
  let component: CountriesFilterComponent;
  let fixture: ComponentFixture<CountriesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
