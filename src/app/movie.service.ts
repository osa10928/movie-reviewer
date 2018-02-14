import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Movie } from './classes/movie';
import { Movies } from './mock-movies';

@Injectable()
export class MovieService {
  moviesPath = 'api/movies';
  moviePath = 'api/movie';
  MOVIES: any;

  constructor(
      private http: HttpClient
   ) { }

  // Question: Should I make a request for movies everytime or just once
  // How often will movie data become stale or old.
  // TODO: Create a way to make a fresh request every 24 hours (or sooner).

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesPath)
  }

  getMovie(title:string, year:number): Observable<Movie> {
    const params = new HttpParams()
        .set('title', title)
        .set('year', year.toString());
    return this.http.get(this.moviePath, {params})
        .pipe(
            map(response => <Movie>response)
        )
 }

}
