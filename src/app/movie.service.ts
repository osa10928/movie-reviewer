import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'

import { Movie } from './classes/movie';
import { MOVIES } from './mock-movies';

@Injectable()
export class MovieService {

  constructor() { }

  getMovies () {
    return of(MOVIES)
  }

  getMovie (title:string, year:number): Observable<Movie> {
    return of(MOVIES.find(movie => movie.title === title && movie.year === year))
  }

}
