import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from 'src/app/common/services/countries.service';
import { Location } from '@angular/common';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Country } from 'src/app/common/models/country';

@Component({
  selector: 'app-countries-details',
  templateUrl: './countries-details.component.html',
  styleUrls: ['./countries-details.component.scss'],
})
export class CountriesDetailsComponent implements OnInit {
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  spinnerVisible = true;

  currentCountryName?: string | null;

  currentCountry: Country = {
    name: {},
    nativeName: '-',
    population: 0,
    region: '-',
    subregion: '-',
    capital: '-',
    topLevelDomain: '-',
    currencies: [],
    languages: '',
    borders: [],
    flags: {},
  };

  constructor(
    private countriesServices: CountriesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentCountryName = params.get('name');
      if (this.currentCountryName) {
        this.countriesServices.searchCountriesByName(this.currentCountryName)
          .subscribe(country => {
            if (country) this.spinnerVisible = false;
            for (let key in this.currentCountry) {
              if (country[0][key]) {
                this.currentCountry[key as keyof Country] = country[0][key];
              }
            }
          })
      }
    })
  }

  backClicked() {
    this.location.back();
  }
}
