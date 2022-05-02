import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/common/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  countries: any;

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countriesService.all()
      .subscribe( countries => {
        console.log(countries);
        
        this.countries = countries;
      })
  }

}
