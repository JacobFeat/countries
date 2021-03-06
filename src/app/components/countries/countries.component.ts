import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { CountriesService } from 'src/app/common/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {

  countries?: any;
  noCountriesMsg?: boolean;

  constructor(private countriesService: CountriesService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params
      .subscribe( params => {
        if(params['regionName'] && params['regionName'] !== 'all'){
          this.searchCountriesByRegion(params['regionName']);
        } else {
          this.fetchCountries();
          this.fetchNoCountriesHandling();
        }
      })
  }

  fetchCountries(): void {
    this.countriesService.all().subscribe((countries) => {
      this.countries = countries;
    });
  }

  fetchNoCountriesHandling() {
    this.countriesService.isNoCountry
      .asObservable()
      .subscribe((msg) => (this.noCountriesMsg = msg));
  }

  searchCountriesByName(countryName: string): void {
    this.countriesService
      .searchCountriesByName(countryName)
      .pipe(catchError((err) => of([])))
      .subscribe((countries) => {
        this.countries = countries;
      });
  }

  searchCountriesByRegion(regionName: string): void {
    this.countriesService.searchCountriesByRegion(regionName)
      .subscribe( countries => {
        this.countries = countries;
      })
  }

}
