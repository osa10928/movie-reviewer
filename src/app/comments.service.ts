import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from './classes/user';
import { Movie } from './classes/movie';
import { Comment } from './classes/comment';
import { Reply } from './classes/reply';

@Injectable()
export class CommentsService {

  constructor(
  	private http: HttpClient
  ) { }

  addComment(comment:string, movie:Movie, user:User): Observable<Comment[]> {
  	const credentials = {
  		comment,
  		movie,
  		user
  	}

  	const options = {
  		withCredentials: true
  	}

  	return this.http.post<Comment[]>('comments/addComment', credentials, options)
  }

  getComments(movie): Observable<Comment[]> {

  	const params = new HttpParams()
  	  .set('movie_id', movie._id)

  	return this.http.get<Comment[]>('comments/getComments', {params})

  }

  editComment(newComment, editedComment, user): Observable<Comment> {
  	const credentials = {
  		newComment, editedComment, user
  	}

  	const options = {
  		withCredentials: true
  	}

  	return this.http.post<Comment>('comments/editComment', credentials, options)
  }

  deleteComment(comment, movie, user): Observable<Comment[]> {

  	const credentials = { comment, movie, user }

  	const options = { withCredentials: true }

  	return this.http.post<Comment[]>('comments/deleteComment', credentials, options)

  }

  addReply(reply, comment, user): Observable<Comment[]> {

  	const credentials = { reply, comment, user }

  	const options = { withCredentials: true }

  	return this.http.post<Comment[]>('comments/addReply', credentials, options)

  }

  editReply(newReply, editReply, comment, user): Observable<Comment[]> {

  	const credentials = { newReply, editReply, comment, user }

  	const options = { withCredentials: true }

  	return this.http.post<Comment[]>('comments/editReply', credentials, options)

  }

  deleteReply(reply, comment, user): Observable<Comment[]> {

  	const credentials = { reply, comment, user }

  	const options = { withCredentials: true }

  	return this.http.post<Comment[]>('comments/deleteReply', credentials, options)
  	
  }

}
