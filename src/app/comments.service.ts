import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from './classes/user';
import { Movie } from './classes/movie';
import { Comment } from './classes/comment';

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

  	return this.http.post('comments/addComment', credentials, options)
  	  .pipe(
  	    map((res:Movie) => {
  	    	return <Comment[]> res.comments
  	    })
  	  )
  }

  editComment(newComment, editedComment, movie, user) {
  	const credentials = {
  		newComment, editedComment, movie, user
  	}

  	const options = {
  		withCredentials: true
  	}

  	return this.http.post('comments/editComment', credentials, options)
  	  .pipe(
  	  	map((res:any) => {
  	  		return <Comment> res
  	  	})
  	  )
  }

  /*

  getComments(movie:Movie): Observable<Comment[]> {
  	const params = new HttpParams()
  		.set('movieTitle', movie.movieTitle)
  		.set('year', movie.year.toString())
  	
  	const options = {
  		withCredentials: true,
  		params: params
  	}

  	return this.http.get<Comment[]>('comments/getComments', options)
  }

  */

}
