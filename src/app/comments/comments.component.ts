import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModule, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  editTextareaLength:number = 0;

  constructor(
  	private usersService: UsersService,
  	private commentsService: CommentsService,
  	private messageService: MessageService,
  	private modalService: NgbModal
  ) { }


  ngOnInit() {
  	this.getComments()
  }

  onTextareaKey(value): void {
  	this.textareaLength = value.length;
  }

  onEditTextareaKey(value) : void {
  	this.editTextareaLength = value.length;
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

  editComment(newComment, editedComment): void {

  	this.commentsService.editComment(newComment, editedComment, this.movie, this.usersService.getUser())
  		.subscribe(
  			comment => {
  				editedComment.body = comment.body
  				console.log(editedComment)
  			},
  			error => {
  				console.log(error)
  				this.messageService.add(error.error)
  			}
  		)
  }

  deleteComment(comment) {
  	
  	this.commentsService.deleteComment(comment, this.movie, this.usersService.getUser())
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

  toggleEditing(comment): void {
  	comment.editing == true ? comment.editing = null : comment.editing = true;
  }

  open(confirmDelete, comment) {
    this.modalService.open(confirmDelete).result.then(
      (result) => {
        if (result === 'delete click') {
          this.deleteComment(comment)
        }
      },
      (reason) => {
      }
    )
  }

}
