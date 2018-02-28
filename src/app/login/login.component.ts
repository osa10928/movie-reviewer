import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  	private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

/*
  onFacebookLogin() {
    this.usersService.facebookLoginUser()
      .subscribe(
        user => {
          console.log(user)
          this.usersService.saveUser(user)
          this.router.navigate(['/']);
        },
         error => {
           console.log(error)
           this.messageService.add(error.error)
         }
      )
  }
*/


  onLogin(userEmail, userPassword) {
    this.usersService.loginUser(userEmail, userPassword)
      .subscribe(
        user => {
          this.usersService.saveUser(user)
          this.router.navigate(['/']);
        },
        error => {
          console.log(error)
          this.messageService.add(error.error)
        }
      );
  }

  onRegister(userEmail, userPassword) {
  	this.usersService.registerUser(userEmail, userPassword)
  	    .subscribe(
  	    	user => {
            this.usersService.saveUser(user)
            this.router.navigate(['/']);
          },
  	    	error => {
            console.log(error)
  	    		this.messageService.add(error.error);
  	    	}
  	    );
  }

}
