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

  addComment(comment:string, movie:Movie, user:User) {
  	console.log(comment, movie, user);
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
  	    map((res:any) => {
  	    	return res
  	    })
  	  )
  }

}
