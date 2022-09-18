import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { CountriesDetailsComponent } from './components/countries/countries-details/countries-details.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CustomRouteReuseStrategy } from './common/services/custom-route-reuse-strategy.service';

const routes: Routes = [
  { path: 'countries', redirectTo: 'countries/region/all', pathMatch: 'full' },
  { path: 'countries/region/:regionName', component: CountriesComponent },
  { path: 'countries/:cioc', component: CountriesDetailsComponent },
  { path: '**', redirectTo: '/countries/region/all' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
  ],
})
export class AppRoutingModule {}
