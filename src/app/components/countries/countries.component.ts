import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, of, Subscription, tap } from 'rxjs';
import { Regions } from 'src/app/components/countries/enums/regions';
import { CountriesService } from 'src/app/common/services/countries.service';
import { SpinnerService } from 'src/app/common/services/spinner.service';
import { CountriesStore, Country } from './models/country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries!: Country[];
  isAnyCountry = true;
  currentRegion?: Regions;

  isSpinnerVisible!: boolean;

  subs: Subscription[] = [];

  countriesStore: CountriesStore = {
    all: [],
    asia: [],
    africa: [],
    americas: [],
    europe: [],
    oceania: [],
  };

  tempCountries!: Country[];

  constructor(
    private countriesService: CountriesService,
    private router: ActivatedRoute,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.router.params.subscribe((params) => {
        this.currentRegion = params['regionName'];
        if (params['regionName'] && params['regionName'] !== 'all') {
          this.searchCountriesByRegion(params['regionName']);
        } else {
          this.fetchCountries();
          this.fetchNoCountriesHandling();
        }
      })
    );

    this.subs.push(
      this.spinnerService.isSpinnerVisible.subscribe((state) => {
        this.isSpinnerVisible = state;
      })
    );
  }

  fetchCountries(): void {
    if (this.countriesStore.all.length) {
      this.countries = this.countriesStore.all;
      this.isSpinnerVisible = false;
      return;
    }

    this.subs.push(
      this.countriesService.all().subscribe((countries) => {
        if (countries) this.isSpinnerVisible = false;
        this.countries = countries;
        this.countriesStore.all = countries;
      })
    );
  }

  fetchNoCountriesHandling() {
    this.subs.push(
      this.countriesService.isNoCountry
        .asObservable()
        .subscribe((msg) => (this.isAnyCountry = msg))
    );
  }

  searchCountriesByName(countryName: string): void {
    // if (!countryName) {
    //   return this.fetchCountries();
    // }
    // this.subs.push(
    //   this.countriesService
    //     .searchCountriesByName(countryName)
    //     .pipe(
    //       catchError(() => {
    //         this.isAnyCountry = false;
    //         return EMPTY;
    //       }),
    //       tap(() => (this.isAnyCountry = true))
    //     )
    //     .subscribe((countries) => (this.countries = countries))
    // );
    const foundCountries = this.countries.filter(({ name }) => {
      const lowerCaseName = name.common?.toLowerCase();
      return lowerCaseName?.includes(countryName.toLowerCase());
    });
    this.countries = foundCountries;
  }

  searchCountriesByRegion(regionName: string): void {
    if (this.countriesStore[regionName as keyof CountriesStore].length) {
      this.countries =
        this.countriesStore[regionName as keyof typeof this.countriesStore];
      this.isSpinnerVisible = false;
      return;
    }

    this.subs.push(
      this.countriesService
        .searchCountriesByRegion(regionName)
        .subscribe((countries) => {
          if (countries) this.isSpinnerVisible = false;
          this.countriesStore[regionName as keyof CountriesStore] = countries;
          this.countries = countries;
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
