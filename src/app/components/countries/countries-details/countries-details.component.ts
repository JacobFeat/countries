import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
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

  currentCountryName?: string | null;

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
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.currentCountryName = params.get('name');
      if (this.currentCountryName) {
        this.countriesServices
          .searchCountriesByName(this.currentCountryName)
          .pipe(
            map((countries) => countries[0]),
            map((country: Country) => {
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
              } as Country;
            })
          )
          .subscribe((country) => {
            if (country) this.spinnerVisible = false;
            console.log(country);
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
}
