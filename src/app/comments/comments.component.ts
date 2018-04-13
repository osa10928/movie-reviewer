import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModule, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Movie } from '../classes/movie';
import { Comment } from '../classes/comment';
import { Reply } from '../classes/reply';
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
  replyTextareaLength:number = 0;

  constructor(
  	private usersService: UsersService,
  	private commentsService: CommentsService,
  	private messageService: MessageService,
  	private modalService: NgbModal
  ) { }


  ngOnInit() {

  	this.getComments()

  }

  onTextareaKey(value:string, type:string) : void {

  	switch(type) {

  		case 'post':
  		  this.textareaLength = value.length;
  		  break;

  		case 'edit':
  		  this.editTextareaLength = value.length;
  		  break;

  		case 'reply':
  		  this.replyTextareaLength = value.length;
  		  break;

  	}

  }

  addComment(comment): void {

  	this.commentsService.addComment(comment, this.movie, this.usersService.getUser())
  		.subscribe(
  			comments => {
  				this.textareaLength = 0;
  				this.comments = comments
  			},
  			error => {
          		console.log(error)
          		this.messageService.add(error.error)
        	}
  		)
  }

  getComments(): void {
  	this.commentsService.getComments(this.movie)
  	    .subscribe(
  	  	    comments => {
  	  		    this.comments = comments
  	  	    },
  	  	    error => {
  	  		    this.messageService.add(error.error)
  	  	    }
  	    )
  }

  editComment(newComment, editedComment): void {

  	this.commentsService.editComment(newComment, editedComment, this.usersService.getUser())
  		.subscribe(
  			comment => {
  				this.editTextareaLength = 0;
  				editedComment.body = comment.body
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
  	  		this.comments = comments
  	  	},
  	  	error => {
  	  		console.log(error)
  	  		this.messageService.add(error.error)
  	  	}
  	  )
  }

  addReply(reply, comment) {

  	this.commentsService.addReply(reply, comment, this.usersService.getUser())
  	  .subscribe(
  	  	comments => {
  	  		this.replyTextareaLength = 0;
  	  		this.comments = comments
  	  	},
  	  	error => {
  	  		console.log(error)
  	  		this.messageService.add(error.error)
  	  	}
  	  )

  }

  editReply(newReply, editReply, comment) {
  	
  	this.commentsService.editReply(newReply, editReply, comment, this.usersService.getUser())
  	  .subscribe(
  	  	comments => {
  	  		this.comments = comments
  	  	},
  	  	error => {
  	  		console.log(error)
  	  		this.messageService.add(error.error)
  	  	}
  	  )

  }

  deleteReply(reply, comment) {

  	this.commentsService.deleteReply(reply, comment, this.usersService.getUser())
  	  .subscribe(
  	  	comments => {
  	  		this.comments = comments
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

  toggleReplying(comment): void {
  	comment.replying == true ? comment.replying = null : comment.replying = true;
  }

  open(confirmDelete, comment, type, reply) {
    this.modalService.open(confirmDelete).result.then(
      (result) => {
        if (result === 'delete click') {
          type == "comment" ? this.deleteComment(comment) : this.deleteReply(reply, comment)
        }
      },
      (reason) => {
      }
    )
  }

}
