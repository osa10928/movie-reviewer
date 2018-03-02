import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';

import { Movie } from '../classes/movie';
import { MovieService } from '../movie.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
  	private movieService: MovieService,
  	private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  onSubmit(...movieData) {
  	this.movieService.addMovie(movieData)
  		.subscribe(
  			movie => {
  				this.messageService.add("Movie Was Successfully added!")
  				let title = movie['title'], year = movie['year']
  				setTimeout(() => {
  					console.log('hey')
  					console.log(title, year)
  					this.movieService.getMovie(title, year);
  				}, 5000)
  			},
  			error => {
  				console.log(error)
  				this.messageService.add(error.error)
  			}
  		)
  }

}
