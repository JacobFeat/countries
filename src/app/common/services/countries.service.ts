import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'https://restcountries.com/v2';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  constructor(private http: HttpClient) { }

  all() {
    return this.http.get(this.getUrl() + '/all');
  }

  private getUrl() {
    return BASE_URL;
  }
}
