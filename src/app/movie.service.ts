import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Movie } from './classes/movie';
import { Movies } from './mock-movies';

@Injectable()
export class MovieService {

  editedMovie:Movie;

  constructor(
      private http: HttpClient
   ) { }

  // Question: Should I make a request for movies everytime or just once
  // How often will movie data become stale or old.
  // TODO: Create a way to make a fresh request every 24 hours (or sooner).

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>("movies/movies")
  }

  getMovie(movieTitle:string, year:number): Observable<Movie> {
    const params = new HttpParams()
        .set('movieTitle', movieTitle)
        .set('year', year.toString());
    return this.http.get("movies/movie", {params})
        .pipe(
            map(res => <Movie>res)
        )
  }

  addMovie(movie:object) {
    const options = {
      withCredentials: true
    }
    const credentials = movie
    return this.http.post("movies/addmovie", credentials, options)
      .pipe(
        map((res:any) => {
          return <Movie> res
        })
      )
  }

  editMovie(movie:object) {
    const options = {
      withCredentials: true
    }
    const credentials = movie
    return this.http.post("movies/editmovie", credentials, options)
      .pipe(
        map((res:any) => {
          return <Movie> res
        })
      )
  }

}
