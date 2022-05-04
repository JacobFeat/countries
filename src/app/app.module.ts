import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountriesComponent } from './components/countries/countries.component';
import { CountriesListComponent } from './components/countries/countries-list/countries-list.component';
import { CountrySearchComponent } from './components/countries/country-search/country-search.component';
import { CountriesFilterComponent } from './components/countries/countries-filter/countries-filter.component';
import { CountriesDetailsComponent } from './components/countries/countries-details/countries-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountriesComponent,
    CountriesListComponent,
    CountrySearchComponent,
    CountriesFilterComponent,
    CountriesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
