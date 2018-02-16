import { Component, OnInit } from '@angular/core';

import { User } from '../classes/user';
import { UsersService } from '../users.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
  	private usersService: UsersService,
  	private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  onLogin (){

  }

  onRegister(userName, userPassword) {
  	this.usersService.registerUser(userName, userPassword)
  	    .subscribe(
  	    	user => console.log(user),
  	    	error => {
  	    		if (error.error.code === 11000) {
  	    			this.messageService.add("This username is already registered");
  	    		} else {
  	    			this.messageService.add(error.message);
  	    		}
  	    	}
  	    );
  }

}
