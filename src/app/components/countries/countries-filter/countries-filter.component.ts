import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Regions } from 'src/app/components/countries/enums/regions';
import { SpinnerService } from 'src/app/common/services/spinner.service';

@Component({
  selector: 'app-countries-filter',
  templateUrl: './countries-filter.component.html',
  styleUrls: ['./countries-filter.component.scss'],
})
export class CountriesFilterComponent {
  isSpinnerVisible!: boolean;

  regions = [
    Regions.All,
    Regions.Africa,
    Regions.Americas,
    Regions.Asia,
    Regions.Europe,
    Regions.Oceania,
  ];

  @Input() currentRegion?: Regions;

  constructor(private spinnerService: SpinnerService) {}

  onChange(): void {
    this.spinnerService.turnOnSpinner();
  }
}
