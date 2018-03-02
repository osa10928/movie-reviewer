import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, RequestOptions, Response, RequestMethod } from '@angular/http';

import { User } from './classes/user';

@Injectable()
export class UsersService {
  user:User = null

  constructor(
    private http: HttpClient
  ) { }
  
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

  loginUser(email:string, password:string) {
    const options = {
      withCredentials: true
    }
    const credentials = { email, password }
    const loginPath = 'users/login';
    return this.http.post(loginPath, credentials, options)
      .pipe(
        map((res:any) => {
          const user:User = {local: res.local, username: res.local.email}
          return <User> user;
        })
      )
  }

  /*

  facebookLoginUser() {
    return this.http.get('users/auth/facebook')
    .pipe(
      map((res:any) => {
        return <User> res
      })
     )
  }
  */

  saveUser(user) {
    localStorage.setItem('Prince Picks', JSON.stringify(user));
    this.getUser()
  }

  getUser() {
    if (JSON.parse(localStorage.getItem('Prince Picks'))) {
      return this.user = JSON.parse(localStorage.getItem('Prince Picks')).username;
    }
    return null;
  }

  logout() {
    if (JSON.parse(localStorage.getItem('Prince Picks'))) {
      localStorage.clear();
      const logoutPath = 'users/logout';
      const options = {
        withCredentials: false
      }
      return this.http.post(logoutPath, options)
        .pipe(
          map(res => {
            console.log(res)
            return <any>res
          })
        )
    }
  }


  ngOnInit() {
    this.getUser()
  }


}
