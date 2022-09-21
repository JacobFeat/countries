import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, of, Subscription, tap } from 'rxjs';
import { Regions } from 'src/app/components/countries/enums/regions';
import { CountriesService } from 'src/app/common/services/countries.service';
import { SpinnerService } from 'src/app/common/services/spinner.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries?: any;
  isAnyCountry = true;
  currentRegion?: Regions;

  isSpinnerVisible!: boolean;

  subs: Subscription[] = [];

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
    this.subs.push(
      this.countriesService.all().subscribe((countries) => {
        if (countries) this.isSpinnerVisible = false;
        this.countries = countries;
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
    if (!countryName) {
      return this.fetchCountries();
    }
    this.subs.push(
      this.countriesService
        .searchCountriesByName(countryName)
        .pipe(
          catchError(() => {
            this.isAnyCountry = false;
            return EMPTY;
          }),
          tap(() => (this.isAnyCountry = true))
        )
        .subscribe((countries) => (this.countries = countries))
    );
  }

  searchCountriesByRegion(regionName: string): void {
    this.subs.push(
      this.countriesService
        .searchCountriesByRegion(regionName)
        .subscribe((countries) => {
          if (countries) this.isSpinnerVisible = false;
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
