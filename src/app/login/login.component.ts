import { Component, OnInit } from '@angular/core';

import { User } from '../classes/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
  	private usersService: UsersService
  ) { }

  ngOnInit() {
  }

  onLogin (){

  }

  onRegister(loginName, loginPassword) {
  	console.log(loginName, loginPassword)
  }

}
