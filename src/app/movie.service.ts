import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Movie } from './classes/movie';
import { MOVIES } from './mock-movies';

@Injectable()
export class MovieService {
  moviesUrl = 'api/movies';

  constructor(private http: HttpClient) { }

  getMovies () {
    return this.http.get<Movie[]>(this.moviesUrl)
  }

  getMovie (title:string, year:number): Observable<Movie> {
    return of(MOVIES.find(movie => movie.title === title && movie.year === year))
  }

}
