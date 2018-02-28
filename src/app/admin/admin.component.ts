import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { Movie } from '../classes/movie';
import { MovieService } from '../movie.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  onSubmit(...movieData) {
  	const attributes = ["movieTitle", "year", "imdb", "trailer", "reviewTitle", "reviewClip", "reviewSumary", "reviewScore", "bestWeek", "bestMonth"]
  	let movie:object = {}
  	for (let i=0;i<movieData.length;i++) {
  		movie[attributes[i]] = movieData[i];
  	}
  	this.movieService.addMovie(movie)
  		.subscribe()
  }

}
