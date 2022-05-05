import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from 'src/app/common/services/countries.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-countries-details',
  templateUrl: './countries-details.component.html',
  styleUrls: ['./countries-details.component.scss'],
})
export class CountriesDetailsComponent implements OnInit {

  currentCountryName?: string | null;

  currentCountry: any = {
    name: '-',
    nativeName: '-',
    population: 0,
    region: '-',
    subregion: '-',
    capital: '-',
    topLevelDomain: '-',
    currencies: [],
    languages: '',
    borders: [],
    flag: ''
  };

  constructor(private countriesServices: CountriesService ,private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.currentCountryName = params.get('name');
      console.log(params);
      
      if(this.currentCountryName){
        this.countriesServices.searchCountriesByName(this.currentCountryName)
          .subscribe( country => {
              for (let key in this.currentCountry ) {
                if(country[0][key]){
                  this.currentCountry[key] = country[0][key];
                }
              }
              console.log(country[0]);
              
          })
      }
      
    })
  }

  backClicked() {
    this.location.back();
  }
}
