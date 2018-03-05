import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../classes/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {
  @Input() movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    this.route.params.subscribe(params => {
      this.movieService.getMovie(params['movieTitle'], params['year'])
        .subscribe(movie => {
          this.movie = movie
        })
    })
  }

}
