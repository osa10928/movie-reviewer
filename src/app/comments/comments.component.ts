import { Component, OnInit, Input, Output } from '@angular/core';

import { Movie } from '../classes/movie';
import { Comment } from '../classes/comment';
import { UsersService } from '../users.service';
import { CommentsService } from '../comments.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() movie: Movie;
  comments: Comment[];
  textareaLength:number = 0;

  constructor(
  	private usersService: UsersService,
  	private commentsService: CommentsService,
  	private messageService: MessageService
  ) { }


  ngOnInit() {
  	this.getComments()
  }

  onTextareaKey(value): void {
  	this.textareaLength = value.length;
  }

  addComment(comment): void {
  	this.commentsService.addComment(comment, this.movie, this.usersService.getUser())
  		.subscribe(
  			comments => {
  				this.comments = comments.reverse()
  			},
  			error => {
          		console.log(error)
          		this.messageService.add(error.error)
        	}
  		)
  }

  getComments(): void {
  	this.comments = this.movie.comments.reverse();
  }

}
