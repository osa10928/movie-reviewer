import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [
  { path: '', component: MoviesComponent, pathMatch: 'full' },
  { path: 'movies/:movieTitle/:year', component: MovieReviewComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
