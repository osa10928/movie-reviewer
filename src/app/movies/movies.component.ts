import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Movie } from '../classes/movie';
import { MovieService } from '../movie.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];

  constructor(
    private movieService: MovieService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(
        movies => {
          this.movies = movies
        },
        error => {
          console.log(error)
          this.messageService.add(error.error)
        }
      );
  }

  editMovie(movie) {
    this.movieService.editedMovie = movie;
    this.router.navigate(['/admin'])
  }

}
