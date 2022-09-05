import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Subject, tap } from 'rxjs';

const BASE_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  private countriesStorage = [];

  isNoCountry = new Subject<boolean>();

  all() {
    return this.http.get<[]>(`${this.getUrl()}/all`);
  }

  searchCountriesByName(countryName: string, fullNameRequired = false) {
    if (!countryName.trim()) {
      this.isNoCountry.next(false);
      return this.all();
    }
    return this.http.get<[]>(this.getUrlWithName() + countryName).pipe(
      tap((_) => {
        this.isNoCountry.next(false);
      }),
      catchError((error) => {
        this.isNoCountry.next(true);
        return of([]);
      })
    );
  }

  searchCountriesByRegion(regionName: string) {
    if (regionName === 'All') {
      return this.all();
    }
    return this.http.get<[]>(this.getUrlWithRegion() + regionName);
  }

  private getUrl() {
    return BASE_URL;
  }

  private getUrlWithName() {
    return `${BASE_URL}/name/`;
  }

  private getUrlWithRegion() {
    return `${BASE_URL}/region/`;
  }
}
