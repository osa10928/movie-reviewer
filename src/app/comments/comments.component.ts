import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../classes/movie';
import { UsersService } from '../users.service';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() movie: Movie; 

  constructor(
  	private usersService: UsersService,
  	private commentsService: CommentsService
  ) { }

  textareaLength:number = 0;

  ngOnInit() {
  }

  onTextareaKey(value) {
  	this.textareaLength = value.length;
  }

  addComment(comment, movie) {
  	this.commentsService.addComment(comment, this.movie, this.usersService.getUser())
  		.subscribe(
  			comment => console.log(comment)
  		)
  }

}
