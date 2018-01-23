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

}
