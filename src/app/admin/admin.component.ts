import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';

import { Movie } from '../classes/movie';
import { MovieService } from '../movie.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isAddHidden:boolean = true;

  constructor(
  	private movieService: MovieService,
  	private messageService: MessageService,
  	private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(...movieData) {
  	this.movieService.addMovie(movieData)
  		.subscribe(
  			movie => {
  				this.messageService.add("Movie Was Successfully added!")
  				let movieTitle = movie['movieTitle'], year = movie['year'];
  				setTimeout(() => {
  					console.log('in')
  					this.router.navigate([`/movies/${movieTitle}/${year}`])
  				}, 5000)
  			},
  			error => {
  				console.log(error)
  				this.messageService.add(error.error)
  			}
  		)
  }

  changeIsAddHidden(): void {
    this.isAddHidden ? this.isAddHidden = false : this.isAddHidden = true
  }

}
