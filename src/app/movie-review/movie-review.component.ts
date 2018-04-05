import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../classes/movie';
import { MovieService } from '../movie.service';
import { MessageService } from '../message.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {
  @Input() movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private messageService: MessageService,
    private usersService: UsersService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    this.route.paramMap.subscribe(params => {
      this.movieService.getMovie(params.get('movieTitle'), +params.get('year'))
        .subscribe(
          movie => {
            this.movie = movie
          },
          error => {
            console.log(error)
            this.messageService.add(error.error);
          }
        )
    })
  }

  editMovie(movie) {
    this.movieService.editedMovie = movie;
    this.router.navigate(['/admin'])
  }

}
