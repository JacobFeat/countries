import { Component, Input } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Country } from 'src/app/common/models/country';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent {
  @Input() countries!: Country[];
  @Input() isAnyCountry?: boolean;
  @Input() isSpinnerVisible?: boolean;

  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
}
