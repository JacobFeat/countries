import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesDetailsComponent } from './components/countries/countries-details/countries-details.component';
import { CountriesComponent } from './components/countries/countries.component';

const routes: Routes = [
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/:name', component: CountriesDetailsComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
