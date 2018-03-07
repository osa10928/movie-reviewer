import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Movie } from '../classes/movie';
import { MovieService } from '../movie.service';
import { MessageService } from '../message.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isAddHidden:boolean = true;
  editMovie:Movie;
  results: Object;
  searchTerms$ = new Subject<string>()
  adminSearch:string = "";

  constructor(
  	private movieService: MovieService,
  	private messageService: MessageService,
    private searchService: SearchService,
  	private router: Router
  ) {
    this.searchService.search(this.searchTerms$)
        .subscribe(results => {
          this.results = results
          console.log(this.results)
        }) 
  }

  ngOnInit() {
  }

  onAddSubmit(...movieData) {
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

  onEditSubmit(...movieData) {
    this.movieService.editMovie(movieData)
      .subscribe(
        movie => {
          this.messageService.add("Movie Was Successfully edited!")
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

  setEditMovie(result) {
    this.editMovie = result
    this.adminSearch = ""
    console.log(this.editMovie)
  }

  clearMovie():void {
    this.editMovie = null;
  }


}
