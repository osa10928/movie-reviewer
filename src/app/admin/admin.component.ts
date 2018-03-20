import { Component, OnInit } from '@angular/core';
import { NgbModule, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Movie } from '../classes/movie';
import { User } from '../classes/user';
import { UsersService } from '../users.service' 
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
  editMovie:Movie = this.movieService.editedMovie;
  editUser:User = this.usersService.editUser;
  results: Object;
  users: Object;
  searchTerms$ = new Subject<string>()
  userSearch$ = new Subject<string>()
  movieSearch:string = "";
  userSearch:string = "";

  constructor(
  	private movieService: MovieService,
  	private messageService: MessageService,
    private searchService: SearchService,
    private usersService: UsersService,
  	private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.searchService.search(this.searchTerms$, 'movie') 
        .subscribe(results => {
          this.results = results
        })

    this.searchService.search(this.userSearch$, 'user')
      .subscribe(users => {
        this.users = users
      })
  }

  ngOnInit() {
    this.getLastUrlPath()
  }

  getLastUrlPath() {
    let pathArr = this.router.url.split('/')
    return pathArr[pathArr.length-1]
  }

  changeIsAddHidden(): void {
    this.isAddHidden ? this.isAddHidden = false : this.isAddHidden = true
  }

  setEditMovie(result) {
    this.editMovie = result
    this.movieService.editedMovie = this.editMovie
    this.movieSearch = ""
    console.log(this.editMovie)
  }

  clearMovie():void {
    this.editMovie = null;
    this.movieService.editedMovie = null;
  }

  setEditUser(user) {
    this.editUser = user
    this.usersService.editUser = this.editUser
    this.userSearch = ""
    console.log(this.editMovie)
  }

  /*

  open(confirmDelete) {
    this.modalService.open(confirmDelete).result.then(
      (result) => {
        if (result === 'delete click') {
          this.onDeleteSubmit(this.editMovie)
        }
      },
      (reason) => {
      }
    )
  }

  */


}
