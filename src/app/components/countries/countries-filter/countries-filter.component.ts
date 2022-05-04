import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-countries-filter',
  templateUrl: './countries-filter.component.html',
  styleUrls: ['./countries-filter.component.scss'],
})
export class CountriesFilterComponent {
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'All'];
  @Output() emitRegion = new EventEmitter<string>();

  onChange(name: string): void {
    this.emitRegion.emit(name);
  }
}
