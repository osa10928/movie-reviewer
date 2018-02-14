import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, Response, RequestMethod } from '@angular/http';

import { User } from './classes/user';

@Injectable()
export class UsersService {
  user:User = null

  constructor(private http: HttpClient) { }
  
  registerUser(username:string, password:string): Observable<User> {
  	const options = {
  		withCredentials: true
  	}
  	const registerPath = 'users/register';
  	const credentials = { username, password };
  	return this.http.post(registerPath, credentials, options)
  	    .pipe(
  	    	map(res => <User>res )
  	    )
  }

  loginUser() {

  }

  getUser() {
  	return this.user;
  }
}
