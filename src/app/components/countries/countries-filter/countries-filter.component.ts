import { Component, EventEmitter, Output } from '@angular/core';
import { SpinnerService } from 'src/app/common/services/spinner.service';

@Component({
  selector: 'app-countries-filter',
  templateUrl: './countries-filter.component.html',
  styleUrls: ['./countries-filter.component.scss'],
})
export class CountriesFilterComponent {
  isSpinnerVisible!: boolean;

  regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private spinnerService: SpinnerService) {}

  onChange(): void {
    this.spinnerService.turnOnSpinner();
  }
}
