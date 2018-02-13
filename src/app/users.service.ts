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

  options =  { 
    withCredentials: true
  }
  
  registerUser(username, password) {
  	const registerPath = 'api/register';
  	const credentials = { username, password };
  	return this.http.post(registerPath, credentials, this.options)
  	    .pipe(
  	    	map(res => of(res))
  	    )
  }

  loginUser() {

  }

  getUser() {
  	return this.user;
  }
}
