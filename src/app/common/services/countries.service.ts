import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

const BASE_URL = 'https://restcountries.com/v2';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  constructor(private http: HttpClient) { }

  all() {
    return this.http.get(this.getUrl() + '/all');
  }

  searchCountries(term: string) {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get(this.getUrlByName() + term);
  }

  private getUrl() {
    return BASE_URL;
  }  
  
  private getUrlByName() {
    return `${BASE_URL}/name/`;
  }
}
