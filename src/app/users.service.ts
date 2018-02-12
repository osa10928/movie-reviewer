import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './classes/user';

@Injectable()
export class UsersService {
  user:User = null

  constructor() { }

  getUser () {
  	return this.user;
  }
}
