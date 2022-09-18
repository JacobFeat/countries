import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { Spinner } from 'src/app/common/enums/spinner.enum';
import { Country, NativeName } from 'src/app/common/models/country';
import { CountriesService } from 'src/app/common/services/countries.service';

@Component({
  selector: 'app-countries-details',
  templateUrl: './countries-details.component.html',
  styleUrls: ['./countries-details.component.scss'],
})
export class CountriesDetailsComponent implements OnInit {
  color = Spinner.Primary;
  mode: ProgressSpinnerMode = Spinner.Indeterminate;
  value = 50;

  spinnerVisible = true;

  currentCountryCode?: string | null;

  currentCountry: any = {
    name: {},
    nativeName: '-',
    population: 0,
    region: '-',
    subregion: '-',
    capital: [] as any[],
    tld: [],
    currencies: [],
    languages: '',
    borders: [],
    flags: {},
  };

  constructor(
    private countriesServices: CountriesService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.currentCountryCode = params.get('cioc');
      if (this.currentCountryCode) {
        this.countriesServices
          .searchCountriesByCode(this.currentCountryCode)
          .pipe(
            map((countries) => countries[0]),
            map((country: Country) => this.adaptCountry(country)),
          )
          .subscribe((country) => {
            if (country) this.spinnerVisible = false;
            for (let key in this.currentCountry) {
              this.currentCountry[key as keyof Country] =
                country[key as keyof Country];
            }
          });
      }
    });
  }

  backClicked() {
    this.location.back();
  }

  private getNativeName(nativeName: NativeName) {
    return Object.values(nativeName)[0]['common'];
  }

  private adaptCountry(country: Country): Country {
    return {
      name: country.name,
      nativeName: this.getNativeName(country.name.nativeName),
      population: country.population,
      region: country.region,
      subregion: country.subregion,
      capital: country.capital,
      tld: country.tld,
      currencies: country.currencies,
      languages: country.languages,
      borders: country.borders,
      flags: country.flags,
    };
  }
}
