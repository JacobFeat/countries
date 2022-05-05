import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-countries-filter',
  templateUrl: './countries-filter.component.html',
  styleUrls: ['./countries-filter.component.scss'],
})
export class CountriesFilterComponent {
  regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  @Output() emitRegion = new EventEmitter<string>();

  onChange(name: string): void {
    this.emitRegion.emit(name);
  }
}
