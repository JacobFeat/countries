import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { CountriesService } from 'src/app/common/services/countries.service';
import { SpinnerService } from 'src/app/common/services/spinner.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries?: any;
  noCountriesMsg?: boolean;

  isSpinnerVisible!: boolean;

  constructor(
    private countriesService: CountriesService,
    private router: ActivatedRoute,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      if (params['regionName'] && params['regionName'] !== 'all') {
        this.searchCountriesByRegion(params['regionName']);
      } else {
        this.fetchCountries();
        this.fetchNoCountriesHandling();
      }
    });

    this.spinnerService.isSpinnerVisible.subscribe((state) => {
      this.isSpinnerVisible = state;
    });
  }

  fetchCountries(): void {
    this.countriesService.all().subscribe((countries) => {
      if (countries) this.isSpinnerVisible = false;
      this.countries = countries;
    });
  }

  fetchNoCountriesHandling() {
    this.countriesService.isNoCountry
      .asObservable()
      .subscribe((msg) => (this.noCountriesMsg = msg));
  }

  searchCountriesByName(countryCode: string): void {
    this.countriesService
      .searchCountriesByCode(countryCode)
      .pipe(catchError((err) => of([])))
      .subscribe((countries) => {
        if (countries) this.isSpinnerVisible = false;
        this.countries = countries;
      });
  }

  searchCountriesByRegion(regionName: string): void {
    this.countriesService
      .searchCountriesByRegion(regionName)
      .subscribe((countries) => {
        if (countries) this.isSpinnerVisible = false;
        this.countries = countries;
      });
  }
}
