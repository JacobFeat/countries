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

  searchCountriesByCode(countryCode: string) {
    if (!countryCode.trim()) {
      this.isNoCountry.next(false);
      return this.all();
    }
    return this.http.get<[]>(this.getUrlWithCode() + countryCode).pipe(
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

  private getUrlWithCode() {
    return `${BASE_URL}/alpha/`;
  }

  private getUrlWithRegion() {
    return `${BASE_URL}/region/`;
  }
}
