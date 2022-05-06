import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { CountriesComponent } from './countries.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountriesDetailsComponent } from './countries-details/countries-details.component';
import { CountrySearchComponent } from './country-search/country-search.component';
import { CountriesFilterComponent } from './countries-filter/countries-filter.component';

@NgModule({
  declarations: [
    CountriesComponent,
    CountriesListComponent,
    CountrySearchComponent,
    CountriesFilterComponent,
    CountriesDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [CountriesComponent],
  providers: [],
})
export class CountriesModule {}
