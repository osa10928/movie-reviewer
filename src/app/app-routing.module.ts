import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { LoginComponent } from './login/login.component';
import {PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'movies/:movieTitle/:year', component: MovieReviewComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
