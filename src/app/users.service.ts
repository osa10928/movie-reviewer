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
  
  registerUser(email:string, password:string): Observable<User> {
  	const options = {
  		withCredentials: true
  	}
  	const registerPath = 'users/register';
  	const credentials = { email, password };
  	return this.http.post(registerPath, credentials, options)
  	    .pipe(
  	    	map((res:any) => {
            const user:User = {local: res.local, username: res.local.email}
            return <User> user;
          })
  	    )
  }

  loginUser() {

  }

  saveUser(user) {
    localStorage.setItem('Prince Picks', JSON.stringify(user));
    this.getUser()
  }

  getUser() {
    return this.user = JSON.parse(localStorage.getItem('Prince Picks')).username;
  }

  ngOnInit() {
    this.getUser()
  }


}
