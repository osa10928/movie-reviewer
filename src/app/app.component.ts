import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { User } from './classes/user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  user: User;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
  	this.user = this.usersService.getUser();
  	/*
    this.usersService.getUser()
      .subscribe(user => {
        this.user = user
      });
      */
  }

}
