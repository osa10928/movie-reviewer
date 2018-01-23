import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Movie } from '../classes/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.movieService.getMovies()
      .subscribe(movies => {
        this.movies = movies
        console.log(this.movies);
      });
  }

}
