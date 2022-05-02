import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})

export class CountriesListComponent {
  @Input() countries: any;

}
